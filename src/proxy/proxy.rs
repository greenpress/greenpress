use crate::utils::auth::get_bearer_token;
use crate::AppConfig;
use actix_web::client::{Client, ClientRequest};
use actix_web::http::{header::SET_COOKIE, StatusCode};
use actix_web::HttpMessage;
use actix_web::{web, Error, HttpRequest, HttpResponse};
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
    // TODO: Is that the default?
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

pub async fn forward(
    req: HttpRequest,
    body: web::Bytes,
    client: web::Data<Client>,
) -> Result<HttpResponse, Error> {
    // TODO: Handle any other route (default route)
    let mut res = HttpResponse::Ok();
    let bearer_token = get_bearer_token(&req).unwrap(); // req.headers.authorization
    let cookie_token = req.cookie("token"); // req.headers.cookie.includes('token=')
    let mut user: String = "".to_owned();

    // if (!(req.headers.authorization || req.headers.cookie && req.headers.cookie.includes('token=')))
    if bearer_token.trim().is_empty() || cookie_token.is_some() {
        // const meUrl = getProxyTarget(authService) + '/api/me'
        let app_config = req.app_data::<web::Data<AppConfig>>().unwrap();
        let me_url_protocol = &app_config.auth_service.protocol;
        let me_url_url = &app_config.auth_service.url;
        let me_url_port = &app_config.auth_service.port;
        let me_url = format!(
            "{}://{}:{}/api/me",
            me_url_protocol, me_url_url, me_url_port
        );

        // fetch(meUrl, headers...)
        let mut auth_res = actix_web::client::Client::new()
            .get(me_url)
            .bearer_auth(bearer_token)
            .cookie(cookie_token.unwrap()) // NOTE: unwrap() should never panic
            .content_type("application/json")
            .send()
            .await?;

        let bytes = auth_res.body().await?;
        // const setCookie = response.headers.raw()['set-cookie']
        let set_cookie = auth_res.headers().get(SET_COOKIE);

        // if (setCookie)
        if set_cookie.is_some() {
            // res.set('set-cookie', setCookie)
            res.set_header(SET_COOKIE, set_cookie.unwrap().to_owned());
        }

        // if (response.status === 200)
        if auth_res.status() == StatusCode::OK {
            // return response.text()
            return Ok(res.body(bytes));
        }

        // req.user = user
        user = String::from_utf8_lossy(&bytes).to_string();
    }

    // based on: https://github.com/actix/examples/blob/master/http-proxy/src/main.rs
    let url = req.path();
    let (forwarded_addr, forwarded_port) = forward_to(url)?;
    let new_url = enrich_url(get_url(&forwarded_addr, forwarded_port), &req);
    let forwarded_req = get_forwarded_req(client, &req, &new_url);
    let mut proxy_res = forwarded_req
        .header(USER_HEADER, user) // proxyReq.setHeader('user', req.user || '')
        .send_body(body)
        .await
        .map_err(Error::from)?;

    res.status(proxy_res.status());

    // Remove `Connection` as per
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Connection#Directives
    for (header_name, header_value) in proxy_res
        .headers()
        .iter()
        .filter(|(h, _)| *h != "connection")
    {
        res.header(header_name.clone(), header_value.clone());
    }

    Ok(res.body(proxy_res.body().await?))
}
