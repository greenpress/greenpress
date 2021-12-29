import express, { Express } from 'express';

import type { ApiConfig, BodyParserType } from './types';

let app: Express;
let config: ApiConfig = {
  cors: !!process.env.API_CORS || false,
  bodyParser: (process.env.API_BODY_PARSER as BodyParserType) || 'json',
  port: parseInt(process.env?.PORT) || 3000,
  ip: process.env.IP || '127.0.0.1'
};

function createApp(): Express {
  app = express()

  if (process.env.NODE_ENV !== 'production') {
    app.use(require('morgan')('combined'))
  }
  if (config.cors) {
    app.use(require('cors')())
  }
  if (config.bodyParser) {
    app.use(express[config.bodyParser]())
  }

  return app;
}

function startApp(serviceName = 'APP', port = config.port, ip = config.ip): Promise<void> {
  app.set('port', port)
  app.set('ip', ip)

  // start the server
  return new Promise((resolve) => {
    app.listen(port, ip, () => {
      console.log(`${serviceName} is running on port ${port}`);
      resolve();
    });
  })
}

module.exports = {
  config: (updatedConfig = config) => {
    config = updatedConfig;
    return config;
  },
  app: () => app || createApp(),
  start: startApp
}
