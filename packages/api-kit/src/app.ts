import { AppOptions } from "@interfaces/app-options.interface";

process.env["NODE_CONFIG_DIR"] = __dirname + "/configs";

import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import compression from "compression";
import cookieParser from "cookie-parser";
import config from "config";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import { useExpressServer, getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import swaggerUi from "swagger-ui-express";
import { logger, stream } from "@utils/logger";
import { userMiddlewares, errorHandlingMiddlewares } from "@middlewares/index";

class App {
  public app: express.Application;
  public serviceName: string;
  public port: string | number;
  public env: string;

  constructor(options: AppOptions) {
    this.app = express();
    this.serviceName = options.serviceName;
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || "development";

    this.initializeMiddlewares();
    this.initializeRoutes(options.controllers);
    this.initializeSwagger(options.controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 ${this.serviceName} listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(morgan(config.get("log.format"), { stream }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(userMiddlewares);
  }

  private initializeRoutes(controllers: Function[]) {
    useExpressServer(this.app, {
      cors: {
        origin: config.get("cors.origin"),
        credentials: config.get("cors.credentials"),
      },
      controllers: controllers,
      defaultErrorHandler: false,
    });
  }

  private initializeSwagger(controllers: Function[]) {
    const { defaultMetadataStorage } = require("class-transformer/cjs/storage");

    const schemas = validationMetadatasToSchemas({
      classTransformerMetadataStorage: defaultMetadataStorage,
      refPointerPrefix: "#/components/schemas/",
    });

    const routingControllersOptions = {
      controllers: controllers,
    };

    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage, routingControllersOptions, {
      components: {
        schemas,
        securitySchemes: {
          basicAuth: {
            scheme: "basic",
            type: "http",
          },
        },
      },
      info: {
        description: "Generated with `routing-controllers-openapi`",
        title: "A sample API",
        version: "1.0.0",
      },
    });

    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));
  }

  private initializeErrorHandling() {
    this.app.use(errorHandlingMiddlewares);
  }
}

export default App;
