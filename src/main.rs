mod api_proxy;
mod config;

use crate::api_proxy::forward;
use crate::config::AppConfig;
use actix_web::client::Client;
use actix_web::http::header::{HeaderName, HeaderValue};
use actix_web::HttpMessage;
use actix_web::{dev::ServiceRequest, middleware, web, App, Error, HttpServer};
use actix_web_httpauth::extractors::bearer::BearerAuth;
use actix_web_httpauth::middleware::HttpAuthentication;
use dotenv::dotenv;
use std::str;

static USER_HEADER: &'static str = "user";

async fn validator(req: ServiceRequest, auth: BearerAuth) -> Result<ServiceRequest, Error> {
    // Opened an issue with requesting more elegant code to get a cookie from a request:
    // https://github.com/actix/actix-web/issues/1818
    let (http_req, payload) = req.into_parts();
    let cookie = http_req.cookie("token=");
    // TODO: Don't use unwrap()
    let mut req = ServiceRequest::from_parts(http_req, payload).ok().unwrap();

    if auth.token().trim().is_empty() || cookie.is_some() {
        return Ok(req);
    }

    // TODO: Get url from config
    let me_url = "http://localhost:9000/api/me";
    let auth_req = Client::new().request_from(me_url, req.head());
    let mut auth_res = auth_req.send().await?;
    let body = auth_res.body().await?;
    let user = str::from_utf8(body.as_ref())?;

    req.headers_mut().insert(
        HeaderName::from_static(USER_HEADER),
        HeaderValue::from_str(user)?,
    );

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
