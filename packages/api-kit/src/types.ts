import { Request } from 'express';

interface InternalService {
	protocol: string;
	url: string;
	port: string;
}

interface InternalServiceOptions {
	url?: string;
}

interface ServerConfig {
	cors: string | boolean;
	bodyParser: string;
}

interface RequestWithUser extends Request {
	user?: any;
	headers: {
		user?: any;
	};
}

export { InternalService, InternalServiceOptions, ServerConfig, RequestWithUser };
