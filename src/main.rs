mod api_proxy;
mod config;

use crate::api_proxy::forward;
use crate::config::AppConfig;
use actix_web::client::Client;
use actix_web::http::header::{HeaderName, HeaderValue};
use actix_web::http::StatusCode;
use actix_web::HttpMessage;
use actix_web::{dev::ServiceRequest, middleware, web, App, Error, HttpServer};
use actix_web_httpauth::extractors::bearer::BearerAuth;
use actix_web_httpauth::middleware::HttpAuthentication;
use dotenv::dotenv;
use std::{env, str};

static USER_HEADER: &'static str = "user";

async fn validator(req: ServiceRequest, auth: BearerAuth) -> Result<ServiceRequest, Error> {
    // Opened an issue with requesting more elegant code to get a cookie from a request:
    // https://github.com/actix/actix-web/issues/1818
    let (http_req, payload) = req.into_parts();
    let cookie = http_req.cookie("token");
    // TODO: Don't use unwrap() because panics?
    let mut req = ServiceRequest::from_parts(http_req, payload).ok().unwrap();

    if auth.token().trim().is_empty() || cookie.is_some() {
        return Ok(req);
    }

    // NOTE: unwrap() should never panic
    let app_config = req.app_data::<web::Data<AppConfig>>().unwrap();
    let me_url_protocol = &app_config.auth_service.protocol;
    let me_url_url = &app_config.auth_service.url;
    let me_url_port = &app_config.auth_service.port;
    let me_url = format!(
        "{}://{}:{}/api/me",
        me_url_protocol, me_url_url, me_url_port
    );
    let auth_req = Client::new()
        .get(me_url)
        .bearer_auth(auth.token())
        .cookie(cookie.unwrap()) // NOTE: unwrap() should never panic
        .content_type("application/json");
    let mut auth_res = auth_req.send().await?;

    /*
     * 200 response always has a payload,
     * though an origin server MAY generate a payload body of zero length.
     * If no payload is desired, an origin server ought to send 204 (No
     * Content) instead.
     *
     * https://tools.ietf.org/html/rfc7231#section-6.3.1
     */
    if auth_res.status() == StatusCode::OK {
        let body = auth_res.body().await?;

        if let Ok(user) = str::from_utf8(body.as_ref()) {
            req.headers_mut().insert(
                HeaderName::from_static(USER_HEADER),
                HeaderValue::from_str(user).unwrap(), // NOTE: unwrap() should never panic
            );
        }
    }

    Ok(req)
}

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
