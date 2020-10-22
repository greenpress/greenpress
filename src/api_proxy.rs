use actix_web::{HttpRequest, web, HttpResponse, Error};
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

    //todo: basic forwarding works, need to map to configurable services

    let forwarded_addr = "127.0.0.1";
    let forwarded_port = 8080;

    let mut new_url = get_url(forwarded_addr, forwarded_port);
    new_url.set_path(req.uri().path());
    new_url.set_query(req.uri().query());

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

// pub fn use_service_config(app_config: AppConfig) {
//     // if app_config.content_service
// }

// Returns target URL
pub fn get_proxy_target(service: ServiceConfig) -> String {
    format!("{}://{}:{}", service.protocol, service.url, service.port)
}

