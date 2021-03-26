mod config;
mod proxy;
mod utils;

#[cfg(test)]
mod tests;

use crate::config::app_config::AppConfig;
use crate::proxy::api_proxy::forward;

use actix_web::{client::Client, middleware::Logger, web, App, HttpServer};
use dotenv::dotenv;
use std::{env, io::Result};

#[actix_web::main]
async fn main() -> Result<()> {
    dotenv().ok();

    env_logger::init();

    let url = env::var("APPLICATION_URL").expect("APPLICATION_URL must be set");
    let port = env::var("PORT").expect("PORT must be set");
    let address = format!("{}:{}", url, port);

    println!("Address: {}", address);

    HttpServer::new(move || {
        // NOTE: Consequently, the *first* middleware registered
        // in the builder chain is the *last* to execute during request processing.
        App::new()
            .data(Client::new())
            .data(AppConfig::new())
            .wrap(Logger::default())
            .default_service(web::route().to(forward))
        //  .default_service() webfront url
    })
    .bind(address)?
    .system_exit()
    .run()
    .await
}
