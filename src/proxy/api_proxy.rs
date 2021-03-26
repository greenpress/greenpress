use crate::utils::auth::*;
use crate::utils::proxy::*;
use crate::utils::url::*;
use crate::AppConfig;

use actix_web::client::Client;
use actix_web::http::Cookie;
use actix_web::http::{header::SET_COOKIE, StatusCode};
use actix_web::HttpMessage;
use actix_web::{web, Error, HttpRequest, HttpResponse};
use std::str;

static TENANT_HEADER: &'static str = "tenant";
static USER_HEADER: &'static str = "user";

pub async fn forward(
    req: HttpRequest,
    body: web::Bytes,
    client: web::Data<Client>,
) -> Result<HttpResponse, Error> {
    // TODO: Handle any other route (default route)
    let mut res = HttpResponse::Ok();
    let app_config = req.app_data::<web::Data<AppConfig>>().unwrap();
    let bearer_token = get_bearer_token(&req);
    let cookie_token = req.cookie("token");
    let mut user: String = "".to_owned();

    if bearer_token.is_some() || cookie_token.is_some() {
        let me_url = get_me_url(&app_config);
        let mut auth_res = actix_web::client::Client::new()
            .get(&me_url)
            .bearer_auth(bearer_token.unwrap_or_default())
            .cookie(cookie_token.unwrap_or(Cookie::named("token")))
            .content_type("application/json")
            .send()
            .await?;

        let bytes = auth_res.body().await?;
        let set_cookie = auth_res.headers().get(SET_COOKIE);

        if set_cookie.is_some() {
            res.set_header(SET_COOKIE, set_cookie.unwrap().to_owned());
        }

        if auth_res.status() == StatusCode::OK {
            return Ok(res.body(bytes));
        }

        user = String::from_utf8_lossy(&bytes).to_string();
    }

    // based on: https://github.com/actix/examples/blob/master/http-proxy/src/main.rs
    let url = req.path();
    let (forwarded_addr, forwarded_port) = forward_to(&app_config, url)?;
    let new_url = enrich_url(get_url(&forwarded_addr, forwarded_port), &req);
    let forwarded_req = get_forwarded_req(client, &req, &new_url);
    let mut proxy_res = forwarded_req
        .header(TENANT_HEADER, app_config.tenant.to_owned())
        .header(USER_HEADER, user.to_owned())
        .send_body(body)
        .await
        .map_err(Error::from)?;

    res.status(proxy_res.status());

    // Remove `Connection` as per
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Connection#Directives
    for (header_name, header_value) in proxy_res
        .headers()
        .iter()
        .filter(|(h, _)| *h != "connection")
    {
        res.header(header_name.clone(), header_value.clone());
    }

    Ok(res.body(proxy_res.body().await?))
}
