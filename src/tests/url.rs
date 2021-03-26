use crate::utils::url::enrich_url;
use actix_web::test;
use url::Url;

#[test]
fn test_enrich_url() {
    let req = test::TestRequest::with_uri("https://example.com/q/?q=5").to_http_request();
    let url = Url::parse("https://result.com/");
    let result = enrich_url(url.unwrap(), &req);
    assert_eq!(result.into_string(), "https://result.com/q/?q=5");
}
