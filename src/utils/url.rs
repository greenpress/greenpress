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
