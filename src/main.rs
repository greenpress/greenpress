mod config;
mod api_proxy;

use crate::config::{AppConfig};
use crate::api_proxy::forward;
use std::net::ToSocketAddrs;
use actix_web::client::Client;
use actix_web::{middleware, web, App, Error, HttpRequest, HttpResponse, HttpServer};
use url::Url;

//todo: add some #[cfg(test)]
#[actix_web::main]
async fn main() -> std::io::Result<()> {

    let app_config = AppConfig::new();
    let address = format!("{}:{}", "0.0.0.0", app_config.port);
    println!("{}", address);

    HttpServer::new(move || {
        App::new()
            .data(Client::new())
            .wrap(middleware::Logger::default())
            .default_service(web::route().to(forward))
            // .default_service() webfront url
    })
        .bind(address)?
        .system_exit()
        .run()
        .await
}
