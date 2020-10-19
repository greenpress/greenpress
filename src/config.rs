use url::Url;

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
    auth_service: ServiceConfig,
    assets_service: ServiceConfig,
    admin_panel: ServiceConfig,
    drafts_service: ServiceConfig
}
// todo: keep converting https://github.com/greenpress/blog-front/blob/master/config/index.js
impl AppConfig {
    pub fn new() -> Self {
        Self {
            port: std::env::var("PORT").unwrap_or_else(|_| "3000".into()).parse().unwrap(),
            tenant: "".to_string(),
            application_url: std::env::var("APPLICATION_URL").unwrap_or_else(|_| "127.0.0.1".into()).parse().unwrap(),
            auth_service: ServiceConfig {
                protocol: "".to_string(),
                url: "".to_string(),
                port: 0,
                proxies: vec![]
            },
            assets_service: ServiceConfig {
                protocol: "".to_string(),
                url: "".to_string(),
                port: 0,
                proxies: vec![]
            },
            admin_panel: ServiceConfig {
                protocol: "".to_string(),
                url: "".to_string(),
                port: 0,
                proxies: vec![]
            },
            drafts_service: ServiceConfig {
                protocol: "".to_string(),
                url: "".to_string(),
                port: 0,
                proxies: vec![]
            }
        }
    }
}

pub fn match_config(new_url: &Url) {
    // todo: pattern matching new_url to resolve url
}
