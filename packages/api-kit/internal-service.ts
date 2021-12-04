import axios, { AxiosPromise } from "axios";

interface InternalService {
  name: string;
  protocol: string;
  url: string;
  port: number;
}

function callInternalService(
  service: InternalService,
  options: Partial<InternalService>
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

module.exports = {
  callInternalService,
  service: (name) => {
    const service = createServiceDescriptor(name);
    return (options: InternalService) => callInternalService(service, options);
  },
};
