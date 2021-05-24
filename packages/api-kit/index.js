const express = require('express')

let app;

let config = {
  cors: !!process.env.API_CORS || false,
  bodyParser: process.env.API_BODY_PARSER || 'json',
};

function createApp() {
  app = express()
  if (process.env.NODE_ENV !== 'production') {
    app.use(require('morgan')('combined'))
  }
  if (config.cors) {
    app.use(require('cors')())
  }
  if (config.bodyParser) {
    app.use(require('body-parser')[config.bodyParser]())
  }

  return app;
}

function startApp(serviceName = 'APP', port = process.env.PORT, ip = (process.env.IP || '127.0.0.1')) {
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
