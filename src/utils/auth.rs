use actix_web::http::header::AUTHORIZATION;
use actix_web::HttpRequest;
use std::str;

pub fn get_bearer_token(req: &HttpRequest) -> Option<&str> {
    let req_headers = req.headers();
    let basic_auth_header = req_headers.get(AUTHORIZATION);
    let basic_auth: &str = basic_auth_header.unwrap().to_str().unwrap();

    Some(basic_auth)
}
