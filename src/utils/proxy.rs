use crate::AppConfig;

use actix_web::client::{Client, ClientRequest};
use actix_web::{web, Error, HttpRequest};
use url::Url;

pub fn get_forwarded_req(
    client: web::Data<Client>,
    req: &HttpRequest,
    new_url: &Url,
) -> ClientRequest {
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

pub fn forward_to(config: &AppConfig, url: &str) -> Result<(String, u16), Error> {
    let services = vec![
        &config.auth_service,
        &config.admin_panel,
        &config.assets_service,
        &config.content_service,
        &config.drafts_service,
    ];
    // TODO: Is that the default?
    let mut forwarded_addr: String = config.application_url.to_string();
    let mut forwarded_port = &config.port;

    // Iterate all services and check if path exists in their proxies vec
    for service in services {
        for proxy in &service.proxies {
            if proxy == &url {
                forwarded_addr = service.url.parse::<String>()?;
                forwarded_port = &service.port;
            }
        }
    }

    Ok((forwarded_addr.to_string(), *forwarded_port))
}
