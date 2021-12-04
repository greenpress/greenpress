import express, { Express } from "express";

import type {
  AppConfigOptions,
  BodyParserType,
} from "./src/interfaces/app-config-options.interface";

export let app: Express = createApp();

export let config: AppConfigOptions = {
  cors: !!process.env.API_CORS || false,
  bodyParser: (process.env.API_BODY_PARSER as BodyParserType) || "json",
};

export function start(
  serviceName = "APP",
  port = parseInt(process.env.PORT as string),
  ip = process.env.IP || "127.0.0.1"
): Promise<void> {
  return startApp(serviceName, port, ip);
}

function createApp(): Express {
  app = express();

  if (process.env.NODE_ENV !== "production") {
    app.use(require("morgan")("combined"));
  }

  if (config.cors) {
    app.use(require("cors")());
  }

  if (config.bodyParser) {
    app.use(express[config.bodyParser]());
  }

  return app;
}

function startApp(
  serviceName: string,
  port: number,
  ip: string
): Promise<void> {
  app.set("port", port);
  app.set("ip", ip);

  // start the server
  return new Promise((resolve) => {
    app.listen(port, ip, () => {
      console.log(`${serviceName} is running on port ${port}`);
      resolve();
    });
  });
}
