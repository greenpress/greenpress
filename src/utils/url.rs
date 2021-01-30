use crate::AppConfig;

use actix_web::HttpRequest;
use std::{net::ToSocketAddrs, str};
use url::Url;

pub fn get_url(addr: &str, port: u16) -> Url {
    Url::parse(&format!(
        "http://{}",
        (addr, port).to_socket_addrs().unwrap().next().unwrap()
    ))
    .unwrap()
}

pub fn enrich_url(mut url: Url, req: &HttpRequest) -> Url {
    url.set_path(req.uri().path());
    url.set_query(req.uri().query());
    url
}

pub fn get_me_url(app_config: &AppConfig) -> String {
    let me_url_protocol = &app_config.auth_service.protocol;
    let me_url_url = &app_config.auth_service.url;
    let me_url_port = &app_config.auth_service.port;
    let me_url = format!(
        "{}://{}:{}/api/me",
        me_url_protocol, me_url_url, me_url_port
    );

    me_url
}
