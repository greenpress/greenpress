mod config;
mod api_proxy;

use std::net::ToSocketAddrs;

use actix_web::client::Client;
use actix_web::{middleware, web, App, Error, HttpRequest, HttpResponse, HttpServer};
use url::Url;
use url::quirks::protocol;
use crate::config::{AppConfig, match_config};
use crate::api_proxy::forward;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let app_config = AppConfig::new();
    let address = format!("{}:{}", app_config.application_url, app_config.port);

    HttpServer::new(move || {
        App::new()
            .data(Client::new())
            .wrap(middleware::Logger::default())
            .default_service(web::route().to(forward))
    })
        .bind(address)?
        .system_exit()
        .run()
        .await
}
