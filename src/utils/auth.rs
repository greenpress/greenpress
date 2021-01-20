use actix_web::http::header::AUTHORIZATION;
use actix_web::HttpRequest;
use std::str;

pub fn get_bearer_token(req: &HttpRequest) -> Option<&str> {
    let req_headers = req.headers();
    let basic_auth_header = req_headers.get(AUTHORIZATION);

    if basic_auth_header.is_some() {
        let basic_auth: &str = basic_auth_header?.to_str().unwrap();

        return Some(basic_auth);
    }

    None
}
