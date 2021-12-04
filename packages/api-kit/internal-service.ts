import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

interface InternalService {
  name: string;
  protocol: string;
  url: string;
  port: number;
}

export function callInternalService(
  service: InternalService,
  options: AxiosRequestConfig
): AxiosPromise {
  return axios({
    ...options,
    url: `${service.protocol}://${service.url}:${service.port}${options.url}`,
  });
}

function createServiceDescriptor(
  name: InternalService["name"]
): InternalService {
  const serviceName = name.toUpperCase();
  const servicePort = process.env[`${serviceName}_SERVICE_PORT`];

  return {
    name,
    protocol: process.env[`${serviceName}_SERVICE_PROTOCOL`] || "http",
    url: process.env[`${serviceName}_SERVICE_URL`] || "localhost",
    port: servicePort ? parseInt(servicePort) : 8080,
  };
}

export function service(
  name: string
): (options: AxiosRequestConfig) => AxiosPromise {
  const service = createServiceDescriptor(name);
  return (options: AxiosRequestConfig) => callInternalService(service, options);
}
