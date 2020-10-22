use actix_web::{HttpRequest, web, HttpResponse, Error, HttpMessage};
use actix_web::client::Client;
use url::Url;
use std::net::ToSocketAddrs;
use crate::config::{ AppConfig, ServiceConfig };

fn get_url(addr: &str, port: u16) -> Url {
    Url::parse(&format!(
        "http://{}",
        (addr, port)
            .to_socket_addrs()
            .unwrap()
            .next()
            .unwrap()
    ))
        .unwrap()
}

pub async fn forward(
    req: HttpRequest,
    body: web::Bytes,
    client: web::Data<Client>,
) -> Result<HttpResponse, Error> {
    // todo: handle auth
    //todo: basic forwarding works, move following block to function
    let url = req.path();
    println!("url {}", url);
    let config = AppConfig::new();
    let services = vec![
                        config.auth_service,
                        config.assets_service,
                        config.content_service,
                        config.drafts_service
    ];
    let mut forwarded_addr = "".to_string();
    let mut forwarded_port = 0;
    for service in &services {
        // if app_config.content_service
        for proxy in &service.proxies {
            if proxy.contains(&url) {
                // result = (&service.url, service.port);
                forwarded_addr = (*service.url).parse()?;
                forwarded_port = service.port;
            }
        }
    }

    let mut new_url = get_url(&*forwarded_addr, forwarded_port);
    new_url.set_path(req.uri().path());
    new_url.set_query(req.uri().query());

    // map_service_config()

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

    let mut res = forwarded_req.send_body(body).await.map_err(Error::from)?;

    let mut client_resp = HttpResponse::build(res.status());
    // Remove `Connection` as per
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Connection#Directives
    for (header_name, header_value) in
    res.headers().iter().filter(|(h, _)| *h != "connection")
    {
        client_resp.header(header_name.clone(), header_value.clone());
    }

    Ok(client_resp.body(res.body().await?))
}

// Returns target URL
pub fn get_proxy_target(service: &ServiceConfig) -> String {
    format!("{}://{}:{}", service.protocol, service.url, service.port)
}

