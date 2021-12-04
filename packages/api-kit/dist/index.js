"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = exports.config = exports.app = void 0;
var express_1 = __importDefault(require("express"));
exports.app = createApp();
exports.config = {
    cors: !!process.env.API_CORS || false,
    bodyParser: process.env.API_BODY_PARSER || "json",
};
function start(serviceName, port, ip) {
    if (serviceName === void 0) { serviceName = "APP"; }
    if (port === void 0) { port = parseInt(process.env.PORT); }
    if (ip === void 0) { ip = process.env.IP || "127.0.0.1"; }
    return startApp(serviceName, port, ip);
}
exports.start = start;
function createApp() {
    exports.app = express_1.default();
    if (process.env.NODE_ENV !== "production") {
        exports.app.use(require("morgan")("combined"));
    }
    if (exports.config.cors) {
        exports.app.use(require("cors")());
    }
    if (exports.config.bodyParser) {
        exports.app.use(express_1.default[exports.config.bodyParser]());
    }
    return exports.app;
}
function startApp(serviceName, port, ip) {
    exports.app.set("port", port);
    exports.app.set("ip", ip);
    // start the server
    return new Promise(function (resolve) {
        exports.app.listen(port, ip, function () {
            console.log(serviceName + " is running on port " + port);
            resolve();
        });
    });
}
