"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.service = exports.callInternalService = void 0;
var axios_1 = __importDefault(require("axios"));
function callInternalService(service, options) {
    return axios_1.default(__assign(__assign({}, options), { url: service.protocol + "://" + service.url + ":" + service.port + options.url }));
}
exports.callInternalService = callInternalService;
function createServiceDescriptor(name) {
    var serviceName = name.toUpperCase();
    var servicePort = process.env[serviceName + "_SERVICE_PORT"];
    return {
        name: name,
        protocol: process.env[serviceName + "_SERVICE_PROTOCOL"] || "http",
        url: process.env[serviceName + "_SERVICE_URL"] || "localhost",
        port: servicePort ? parseInt(servicePort) : 8080,
    };
}
function service(name) {
    var service = createServiceDescriptor(name);
    return function (options) { return callInternalService(service, options); };
}
exports.service = service;
