use crate::config::AppConfig;
use actix_web::client::{Client, ClientRequest};
use actix_web::dev::ServiceRequest;
use actix_web::http::header::{HeaderName, HeaderValue};
use actix_web::http::StatusCode;
use actix_web::HttpMessage;
use actix_web::{web, Error, HttpRequest, HttpResponse};
use actix_web_httpauth::extractors::bearer::BearerAuth;
use std::{net::ToSocketAddrs, str};
use url::Url;

static USER_HEADER: &'static str = "user";

fn get_url(addr: &str, port: u16) -> Url {
    Url::parse(&format!(
        "http://{}",
        (addr, port).to_socket_addrs().unwrap().next().unwrap()
    ))
    .unwrap()
}

fn enrich_url(mut url: Url, req: &HttpRequest) -> Url {
    url.set_path(req.uri().path());
    url.set_query(req.uri().query());
    url
}

fn get_forwarded_req(client: web::Data<Client>, req: &HttpRequest, new_url: &Url) -> ClientRequest {
    // TODO: This forwarded implementation is incomplete as it only handles the inofficial
    // X-Forwarded-For header but not the official Forwarded one.
    let forwarded_req = client
        .request_from(new_url.as_str(), req.head())
        .no_decompress();
    let forwarded_req = if let Some(addr) = req.head().peer_addr {
        forwarded_req.header("x-forwarded-for", format!("{}", addr.ip()))
    } else {
        forwarded_req
    };
    forwarded_req
}

fn forward_to(url: &str) -> Result<(String, u16), Error> {
    let config = AppConfig::new();
    let services = vec![
        // config.auth_service, // config.admin_panel ?
        config.assets_service,
        config.content_service,
        config.drafts_service,
    ];
    // todo: is that the default?
    let mut forwarded_addr = config.application_url;
    let mut forwarded_port = config.port;
    // Iterate all services and check if path exists in their proxies vec
    for service in &services {
        // if app_config.content_service
        for proxy in &service.proxies {
            if proxy.contains(&url) {
                // result = (&service.url, service.port);
                forwarded_addr = (*service.url).parse()?; // dereferences service to access the value
                forwarded_port = service.port;
            }
        }
    }
    Ok((forwarded_addr, forwarded_port))
}

// Handle header

fn get_auth_header(req: &HttpRequest) -> Option<&str> {
    let req_headers = req.headers();
    let basic_auth_header = req_headers.get("Authorization"); //todo: is it?
    let basic_auth: &str = basic_auth_header.unwrap().to_str().unwrap();
    Some(basic_auth)
}

fn get_header_cookie(req: &HttpRequest) -> Option<&str> {
    let req_headers = req.headers();
    let header_cookie = req_headers.get("cookie"); //todo: is it?
    let cookie: &str = header_cookie.unwrap().to_str().unwrap();
    Some(cookie)
}

fn handle_req_header(req: &HttpRequest) {
    let auth = get_auth_header(req).unwrap();
    let cookie = get_header_cookie(req).unwrap();
    println!("{}", auth);
}
// ['set-cookie']

pub async fn validator(req: ServiceRequest, auth: BearerAuth) -> Result<ServiceRequest, Error> {
    // Opened an issue with requesting more elegant code to get a cookie from a request:
    // https://github.com/actix/actix-web/issues/1818
    let (http_req, payload) = req.into_parts();
    let cookie = http_req.cookie("token");
    // TODO: Don't use unwrap() because panics?
    let mut req = ServiceRequest::from_parts(http_req, payload).ok().unwrap();

    if auth.token().trim().is_empty() || cookie.is_some() {
        return Ok(req);
    }

    // NOTE: unwrap() should never panic
    let app_config = req.app_data::<web::Data<AppConfig>>().unwrap();
    let me_url_protocol = &app_config.auth_service.protocol;
    let me_url_url = &app_config.auth_service.url;
    let me_url_port = &app_config.auth_service.port;
    let me_url = format!(
        "{}://{}:{}/api/me",
        me_url_protocol, me_url_url, me_url_port
    );
    let auth_req = Client::new()
        .get(me_url)
        .bearer_auth(auth.token())
        .cookie(cookie.unwrap()) // NOTE: unwrap() should never panic
        .content_type("application/json");
    let mut auth_res = auth_req.send().await?;

    // TODO: Do set-cookie
    // TODO: Don't check status code
    /*
     * 200 response always has a payload,
     * though an origin server MAY generate a payload body of zero length.
     * If no payload is desired, an origin server ought to send 204 (No
     * Content) instead.
     *
     * https://tools.ietf.org/html/rfc7231#section-6.3.1
     */
    if auth_res.status() == StatusCode::OK {
        let body = auth_res.body().await?;

        if let Ok(user) = str::from_utf8(body.as_ref()) {
            req.headers_mut().insert(
                HeaderName::from_static(USER_HEADER),
                HeaderValue::from_str(user).unwrap(), // NOTE: unwrap() should never panic
            );
        }
    }

    Ok(req)
}

pub async fn forward(
    req: HttpRequest,
    body: web::Bytes,
    client: web::Data<Client>,
) -> Result<HttpResponse, Error> {
    // todo: 1. handle auth (maybe middleware)
    // todo: 2. handle any other route (default route)
    let url = req.path();
    let (forwarded_addr, forwarded_port) = forward_to(url)?;

    // based on: https://github.com/actix/examples/blob/master/http-proxy/src/main.rs
    let new_url = enrich_url(get_url(&forwarded_addr, forwarded_port), &req);
    let forwarded_req = get_forwarded_req(client, &req, &new_url);
    let mut res = forwarded_req.send_body(body).await.map_err(Error::from)?;

    let mut client_resp = HttpResponse::build(res.status());
    // Remove `Connection` as per
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Connection#Directives
    for (header_name, header_value) in res.headers().iter().filter(|(h, _)| *h != "connection") {
        client_resp.header(header_name.clone(), header_value.clone());
    }

    Ok(client_resp.body(res.body().await?))
}
