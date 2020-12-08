mod api_proxy;
mod config;

use crate::api_proxy::forward;
use crate::config::AppConfig;
use actix_web::client::Client;
use actix_web::HttpMessage;
use actix_web::{dev::ServiceRequest, middleware, web, App, Error, HttpServer};
use actix_web_httpauth::extractors::bearer::BearerAuth;
use actix_web_httpauth::middleware::HttpAuthentication;
use dotenv::dotenv;

async fn validator(req: ServiceRequest, auth: BearerAuth) -> Result<ServiceRequest, Error> {
    // Opened an issue with requesting more elegant code to get a cookie from a request:
    // https://github.com/actix/actix-web/issues/1818
    let (http_req, payload) = req.into_parts();
    let cookie = http_req.cookie("token=");
    let req = ServiceRequest::from_parts(http_req, payload).ok().unwrap();

    if auth.token().trim().is_empty() || cookie.is_some() {
        return Ok(req);
    }

    // TODO: Call auth service

    Ok(req)
}

//todo: add some #[cfg(test)]
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let app_config = AppConfig::new();
    let address = format!("{}:{}", app_config.application_url, app_config.port);

    println!("{}", address);

    HttpServer::new(move || {
        let middleware = HttpAuthentication::bearer(validator);

        App::new()
            .data(Client::new())
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
