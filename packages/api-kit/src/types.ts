import type { Request } from 'express';

export interface ApiConfig {
  cors: boolean;
  bodyParser: BodyParserType;
  port: string | number;
  ip: string;
}

export type BodyParserType = 'json' | 'urlencoded' | 'raw' | 'text';

export interface Service {
  url: string;
  port: number | string;
  protocol: ServiceProtocol;
}

export type ServiceProtocol = 'http' | 'https';

export interface RequestWithUser extends Omit<Request, 'headers'> {
  user?: Record<string, any>;
  headers?: RequestHeadersWithUser
}

type RequestHeadersWithUser = Request['headers'] | {
  user?: string
};

