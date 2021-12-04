"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app;
var config = {
    cors: !!process.env.API_CORS || false,
    bodyParser: process.env.API_BODY_PARSER || "json",
};
function createApp() {
    app = express_1.default();
    if (process.env.NODE_ENV !== "production") {
        app.use(require("morgan")("combined"));
    }
    if (config.cors) {
        app.use(require("cors")());
    }
    if (config.bodyParser) {
        app.use(express_1.default[config.bodyParser]());
    }
    return app;
}
function startApp(serviceName, port, ip) {
    if (serviceName === void 0) { serviceName = "APP"; }
    if (port === void 0) { port = parseInt(process.env.PORT); }
    if (ip === void 0) { ip = process.env.IP || "127.0.0.1"; }
    app.set("port", port);
    app.set("ip", ip);
    // start the server
    return new Promise(function (resolve) {
        app.listen(port, ip, function () {
            console.log(serviceName + " is running on port " + port);
            resolve();
        });
    });
}
module.exports = {
    config: function (updatedConfig) {
        if (updatedConfig === void 0) { updatedConfig = config; }
        config = updatedConfig;
        return config;
    },
    app: function () { return app || createApp(); },
    start: startApp,
};
