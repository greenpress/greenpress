mod api_proxy;
mod config;

use crate::api_proxy::forward;
use crate::config::AppConfig;
use actix_web::client::Client;
use actix_web::{middleware, web, App, HttpServer};
use dotenv::dotenv;

//todo: add some #[cfg(test)]
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let app_config = AppConfig::new();
    let address = format!("{}:{}", app_config.application_url, app_config.port);

    println!("{}", address);

    HttpServer::new(move || {
        App::new()
            .data(Client::new())
            .wrap(middleware::Logger::default())
            .default_service(web::route().to(forward))
        //  .default_service() webfront url
    })
    .bind(address)?
    .system_exit()
    .run()
    .await
}
