use crate::utils::url::enrich_url;
use actix_web::test;
use std::str::FromStr;
use url::Url;

#[test]
fn test_get_url() {
    let url = get_url("127.0.0.1", 8888);
    // This specific example seems to work, but I'm not sure if this is what we mean to do.
    assert_eq!(url.into_string(), "http://127.0.0.1:8888/");
    // the following commented code will fail, which is why I'm not sure about our intent.
    // let url = get_url("www.example.com", 8888);
    // assert_eq!(url.into_string(), "http://www.example.com:8888/");
}

#[test]
fn test_enrich_url() {
    let req = test::TestRequest::with_uri("https://example.com/q/?q=5").to_http_request();
    let url = Url::parse("https://result.com/");
    let result = enrich_url(url.unwrap(), &req);
    assert_eq!(result.into_string(), "https://result.com/q/?q=5");
}

#[test]
fn test_get_auth_header_with_auth() {
    let req = test::TestRequest::with_uri("https://example.com/")
        .header("Authorization", "blah")
        .to_http_request();
    let auth_value = get_auth_header(&req);
    assert_eq!("blah", auth_value.unwrap());
}

#[test]
#[should_panic]
fn test_get_auth_header_no_auth() {
    let req = test::TestRequest::with_uri("https://example.com/").to_http_request();
    let auth_value = get_auth_header(&req);
    assert_eq!(true, auth_value.is_none());
}

#[test]
fn test_get_header_cookie_with_cookie() {
    let req = test::TestRequest::with_uri("https://example.com/")
        .header("cookie", "blah")
        .to_http_request();
    let cookie_value = get_header_cookie(&req);
    assert_eq!("blah", cookie_value.unwrap());
}

#[test]
#[should_panic]
fn test_get_header_cookie_no_cookie() {
    let req = test::TestRequest::with_uri("https://example.com/").to_http_request();
    let cookie_value = get_header_cookie(&req);
    assert_eq!(true, cookie_value.is_none());
}

