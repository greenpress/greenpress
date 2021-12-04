import axios, { AxiosPromise } from "axios";

export class InternalService {
  constructor(
    readonly name: string,
    readonly url: string,
    readonly port,
    readonly protocol: string
  ) {
    this.name = name.toUpperCase();
    this.url = url;
    this.port = port;
    this.protocol = protocol;
  }

  call(service, options): AxiosPromise {
    return axios({
      ...options,
      url: `${this.protocol}://${this.url}:${this.port}${options.url}`,
    });
  }

  getUrlParams() {
    return {
      protocol: process.env[`${name}_SERVICE_PROTOCOL`] || "http",
      url: process.env[`${name}_SERVICE_URL`] || "localhost",
      port: process.env[`${name}_SERVICE_PORT`] || 8080,
    };
  }
}
