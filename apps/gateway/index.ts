import { start, config, app as getApp } from "@greenpress/api-kit";
import cacheManager from "./cache-manager";
import apiProxy from "@greenpress/api-proxy-middleware";

config({ cors: false, bodyParser: false });

const app = getApp();
apiProxy(app, {}, cacheManager);

start("Gateway", process.env.PORT || 3000, process.env.IP || "0.0.0.0");
