use std::env::var;

pub struct ServiceConfig {
    pub protocol: String,
    pub url: String,
    pub port: u16,
    pub proxies: Vec<String>,
}

#[allow(dead_code)]
pub struct AppConfig {
    pub port: u16,
    tenant: String,
    pub application_url: String,
    pub content_service: ServiceConfig,
    pub auth_service: ServiceConfig,
    pub assets_service: ServiceConfig,
    pub admin_panel: ServiceConfig,
    pub drafts_service: ServiceConfig,
}

// https://github.com/greenpress/blog-front/blob/master/config/index.js
impl AppConfig {
    pub fn new() -> Self {
        Self {
            port: var("PORT").unwrap().parse().unwrap(),
            tenant: var("BASIC_TENANT").unwrap().parse().unwrap(),
            application_url: var("APPLICATION_URL").unwrap().parse().unwrap(),
            content_service: ServiceConfig {
                protocol: var("CONTENT_SERVICE_PROTOCOL").unwrap().parse().unwrap(),
                url: var("CONTENT_SERVICE_URL").unwrap().parse().unwrap(),
                port: var("CONTENT_SERVICE_PORT").unwrap().parse().unwrap(),
                proxies: vec![
                    "/api/categories".to_string(),
                    "/api/posts".to_string(),
                    "/api/menus".to_string(),
                    "/api/tags".to_string(),
                    "/api/configurations".to_string(),
                ], //CONTENT_SERVICE_PROXIES
            },
            auth_service: ServiceConfig {
                protocol: var("AUTH_SERVICE_PROTOCOL").unwrap().parse().unwrap(),
                url: var("AUTH_SERVICE_URL").unwrap().parse().unwrap(),
                port: var("AUTH_SERVICE_PORT").unwrap().parse().unwrap(),
                proxies: vec![
                    "/api/signin".to_string(),
                    "/api/signup".to_string(),
                    "/api/token".to_string(),
                    "/api/me".to_string(),
                    "/api/users".to_string(),
                    "/api/logout".to_string(),
                ],
            },
            assets_service: ServiceConfig {
                protocol: var("ASSETS_SERVICE_PROTOCOL").unwrap().parse().unwrap(),
                url: var("ASSETS_SERVICE_URL").unwrap().parse().unwrap(),
                port: var("ASSETS_SERVICE_PORT").unwrap().parse().unwrap(),
                proxies: vec!["/api/assets".to_string(), "/api/storage".to_string()], //ASSETS_SERVICE_PROXIES
            },
            admin_panel: ServiceConfig {
                protocol: var("ADMIN_PANEL_PROTOCOL").unwrap().parse().unwrap(),
                url: var("ADMIN_PANEL_URL").unwrap().parse().unwrap(),
                port: var("ADMIN_PANEL_PORT").unwrap().parse().unwrap(),
                proxies: vec!["/gp-admin".to_string()], // ADMIN_PANEL_PROXIES
            },
            drafts_service: ServiceConfig {
                protocol: var("DRAFTS_SERVICE_PROTOCOL").unwrap().parse().unwrap(),
                url: var("DRAFTS_SERVICE_URL").unwrap().parse().unwrap(),
                port: var("DRAFTS_SERVICE_PORT").unwrap().parse().unwrap(),
                proxies: vec!["/api/drafts".to_string()], // DRAFTS_SERVICE_PROXIES
            },
        }
    }
}
