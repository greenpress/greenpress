mod api_proxy;
mod config;

use crate::api_proxy::{forward, validator};
use crate::config::AppConfig;
use actix_web::{client::Client, middleware, web, App, HttpServer};
use actix_web_httpauth::middleware::HttpAuthentication;
use dotenv::dotenv;
use std::env;

//todo: add some #[cfg(test)]
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let url = env::var("APPLICATION_URL").expect("APPLICATION_URL must be set");
    let port = env::var("PORT").expect("PORT must be set");
    let address = format!("{}:{}", url, port);

    println!("{}", address);

    HttpServer::new(move || {
        let middleware = HttpAuthentication::bearer(validator);

        // NOTE: Consequently, the *first* middleware registered
        // in the builder chain is the *last* to execute during request processing.

        App::new()
            .data(Client::new())
            .data(AppConfig::new())
            .wrap(middleware)
            .wrap(middleware::Logger::default())
            .default_service(web::route().to(forward))
        //  .default_service() webfront url
    })
    .bind(address)?
    .system_exit()
    .run()
    .await
}
