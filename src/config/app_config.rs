pub struct ServiceConfig {
    pub protocol: String,
    pub url: String,
    pub port: u16,
    pub proxies: Vec<String>,
}

#[allow(dead_code)]
pub struct AppConfig {
    pub port: u16,
    pub tenant: String,
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
            port: std::env::var("PORT")
                .expect("PORT not found")
                .parse()
                .unwrap(),
            tenant: std::env::var("BASIC_TENANT")
                .expect("BASIC_TENANT not found")
                .parse()
                .unwrap(),
            application_url: std::env::var("APPLICATION_URL")
                .expect("APPLICATION_URL not found")
                .parse()
                .unwrap(),
            content_service: ServiceConfig {
                protocol: std::env::var("CONTENT_SERVICE_PROTOCOL")
                    .expect("CONTENT_SERVICE_PROTOCOL not found")
                    .parse()
                    .unwrap(),
                url: std::env::var("CONTENT_SERVICE_URL")
                    .expect("CONTENT_SERVICE_URL not found")
                    .parse()
                    .unwrap(),
                port: std::env::var("CONTENT_SERVICE_PORT")
                    .expect("CONTENT_SERVICE_PORT not found")
                    .parse()
                    .unwrap(),
                proxies: vec![
                    "/api/categories".to_string(),
                    "/api/posts".to_string(),
                    "/api/menus".to_string(),
                    "/api/tags".to_string(),
                    "/api/configurations".to_string(),
                ],
            },
            auth_service: ServiceConfig {
                protocol: std::env::var("AUTH_SERVICE_PROTOCOL")
                    .expect("AUTH_SERVICE_PROTOCOL not found")
                    .parse()
                    .unwrap(),
                url: std::env::var("AUTH_SERVICE_URL")
                    .expect("AUTH_SERVICE_URL not found")
                    .parse()
                    .unwrap(),
                port: std::env::var("AUTH_SERVICE_PORT")
                    .expect("AUTH_SERVICE_PORT not found")
                    .parse()
                    .unwrap(),
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
                protocol: std::env::var("ASSETS_SERVICE_PROTOCOL")
                    .expect("ASSETS_SERVICE_PROTOCOL not found")
                    .parse()
                    .unwrap(),
                url: std::env::var("ASSETS_SERVICE_URL")
                    .expect("ASSETS_SERVICE_URL not found")
                    .parse()
                    .unwrap(),
                port: std::env::var("ASSETS_SERVICE_PORT")
                    .expect("ASSETS_SERVICE_PORT not found")
                    .parse()
                    .unwrap(),
                proxies: vec!["/api/assets".to_string(), "/api/storage".to_string()],
            },
            admin_panel: ServiceConfig {
                protocol: std::env::var("ADMIN_PANEL_PROTOCOL")
                    .expect("ADMIN_PANEL_PROTOCOL not found")
                    .parse()
                    .unwrap(),
                url: std::env::var("ADMIN_PANEL_URL")
                    .expect("ADMIN_PANEL_URL not found")
                    .parse()
                    .unwrap(),
                port: std::env::var("ADMIN_PANEL_PORT")
                    .expect("ADMIN_PANEL_PORT not found")
                    .parse()
                    .unwrap(),
                proxies: vec!["/gp-admin".to_string()],
            },
            drafts_service: ServiceConfig {
                protocol: std::env::var("DRAFTS_SERVICE_PROTOCOL")
                    .expect("DRAFTS_SERVICE_PROTOCOL not found")
                    .parse()
                    .unwrap(),
                url: std::env::var("DRAFTS_SERVICE_URL")
                    .expect("DRAFTS_SERVICE_URL not found")
                    .parse()
                    .unwrap(),
                port: std::env::var("DRAFTS_SERVICE_PORT")
                    .expect("DRAFTS_SERVICE_PORT not found")
                    .parse()
                    .unwrap(),
                proxies: vec!["/api/drafts".to_string()],
            },
        }
    }
}
