import express, { Express } from 'express';
import type { ApiConfig, BodyParserType } from './types';

let _app: Express;

let _config: ApiConfig = {
  cors: !!process.env.API_CORS || false,
  bodyParser: (process.env.API_BODY_PARSER as BodyParserType) || 'json',
  port: parseInt(process.env?.PORT) || 3000,
  ip: process.env.IP || '127.0.0.1'
};

function createApp() {
  _app = express()

  if (process.env.NODE_ENV !== 'production') {
    _app.use(require('morgan')('combined'))
  }
  if (_config.cors) {
    _app.use(require('cors')())
  }
  if (_config.bodyParser) {
    _app.use(express[_config.bodyParser]())
  }

  return _app;
}

function startApp(serviceName = 'APP', port = _config.port, ip = _config.ip): Promise<void> {
  _app.set('_port', port)
  _app.set('_ip', ip)

  // start the server
  return new Promise((resolve) => {
    _app.listen(port, ip, () => {
      console.log(`${serviceName} is running on port ${port}`);
      resolve();
    });
  })
}

export const app = () => _app || createApp();
export const config = (updatedConfig = config): ApiConfig => {
  _config = { ..._config, ...updatedConfig };
  return config;
}
export const start = startApp;
