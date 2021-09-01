const { NODE_ENV, IP, API_CORS, API_BODY_PARSER } = process.env;

const isProduction = NODE_ENV === 'production';
const ipFallback = IP || '127.0.0.1';
const corsConfig = !!API_CORS || false;
const bodyParserConfig = API_BODY_PARSER || 'json';

enum serviceDescriptor {
	PROTOCOL = '_SERVICE_PROTOCOL',
	URL = '_SERVICE_URL',
	PORT = '_SERVICE_PORT',
}

export { isProduction, ipFallback, corsConfig, bodyParserConfig, serviceDescriptor };
