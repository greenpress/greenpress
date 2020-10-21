use url::Url;
use std::str::Split;
use std::ops::RangeFrom;

struct ServiceConfig {
    protocol: String,
    url: String,
    port: u16,
    proxies: Vec<String>
}

pub struct AppConfig {
    pub port: u16,
    tenant: String,
    pub application_url: String,
    content_service: ServiceConfig,
    auth_service: ServiceConfig,
    assets_service: ServiceConfig,
    admin_panel: ServiceConfig,
    drafts_service: ServiceConfig
}

// https://github.com/greenpress/blog-front/blob/master/config/index.js
impl AppConfig {
    pub fn new() -> Self {
        Self {
            port: std::env::var("PORT").unwrap_or_else(|_| "3007".into()).parse().unwrap(),
            tenant: std::env::var("BASIC_TENANT").unwrap_or_else(|_| "0".into()).parse().unwrap(),
            application_url: std::env::var("APPLICATION_URL").unwrap_or_else(|_| "127.0.0.1".into()).parse().unwrap(),
            content_service: ServiceConfig {
                protocol: std::env::var("CONTENT_SERVICE_PROTOCOL").unwrap_or_else(|_| "http".into()).parse().unwrap(),
                url: std::env::var("CONTENT_SERVICE_URL").unwrap_or_else(|_| "localhost".into()).parse().unwrap(),
                port: std::env::var("CONTENT_SERVICE_PORT").unwrap_or_else(|_| "9001".into()).parse().unwrap(),
                proxies: vec![
                "/api/categories".to_string(),
                "/api/posts".to_string(),
                "/api/menus".to_string(),
                "/api/tags".to_string(),
                "/api/configurations".to_string()] //CONTENT_SERVICE_PROXIES
            },
            auth_service: ServiceConfig {
                protocol: std::env::var("AUTH_SERVICE_PROTOCOL").unwrap_or_else(|_| "http".into()).parse().unwrap(),
                url: std::env::var("AUTH_SERVICE_URL").unwrap_or_else(|_| "localhost".into()).parse().unwrap(),
                port: std::env::var("AUTH_SERVICE_PORT").unwrap_or_else(|_| "9000".into()).parse().unwrap(),
                proxies: vec![	"/api/signin".to_string(),
                "/api/signup".to_string(),
                "/api/token".to_string(),
                "/api/me".to_string(),
                "/api/users".to_string(),
                "/api/logout".to_string()]
            },
            assets_service: ServiceConfig {
                protocol: std::env::var("ASSETS_SERVICE_PROTOCOL").unwrap_or_else(|_| "http".into()).parse().unwrap(),
                url: std::env::var("ASSETS_SERVICE_URL").unwrap_or_else(|_| "localhost".into()).parse().unwrap(),
                port: std::env::var("ASSETS_SERVICE_PORT").unwrap_or_else(|_| "9003".into()).parse().unwrap(),
                proxies: vec![
                "/api/assets".to_string(),
                "/api/storage".to_string()] //ASSETS_SERVICE_PROXIES
            },
            admin_panel: ServiceConfig {
                protocol: std::env::var("ADMIN_PANEL_PROTOCOL").unwrap_or_else(|_| "http".into()).parse().unwrap(),
                url: std::env::var("ADMIN_PANEL_URL").unwrap_or_else(|_| "localhost".into()).parse().unwrap(),
                port: std::env::var("ADMIN_PANEL_PORT").unwrap_or_else(|_| "3001".into()).parse().unwrap(),
                proxies: vec!["/gp-admin".to_string()] // ADMIN_PANEL_PROXIES
            },
            drafts_service: ServiceConfig {
                protocol: std::env::var("DRAFTS_SERVICE_PROTOCOL").unwrap_or_else(|_| "http".into()).parse().unwrap(),
                url: std::env::var("DRAFTS_SERVICE_URL").unwrap_or_else(|_| "localhost".into()).parse().unwrap(),
                port: std::env::var("DRAFTS_SERVICE_PORT").unwrap_or_else(|_| "9005".into()).parse().unwrap(),
                proxies: vec!["/api/drafts".to_string()] // DRAFTS_SERVICE_PROXIES
            }
        }
    }
}

// fn get_proxies<'a>(env_var: String, defaults: std::str::Split<P>) -> Split<'a, char> {
//     if env_var { env_var.split(',') } else { defaults }
// }

// pub fn match_config(url: String, port: u16) -> (String, u16) {
//
// }
