import { start, config, app as getApp } from "@greenpress/api-kit";
import cacheManager from "./cache-manager";

config({ cors: false, bodyParser: false });

const app = getApp();
require("@greenpress/api-proxy-middleware")(app, {}, cacheManager);

start("Gateway", process.env.PORT || 3000, process.env.IP || "0.0.0.0");
