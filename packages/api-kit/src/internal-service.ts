import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { Service, ServiceProtocol } from './types';

function callInternalService(service: Service, options: AxiosRequestConfig): AxiosPromise {
  return axios({
    ...options,
    url: `${service.protocol}://${service.url}:${service.port}${options.url}`,
  })
}

function createServiceDescriptor(name: string): Service {
  name = name.toUpperCase();

  return {
    protocol: (process.env[`${name}_SERVICE_PROTOCOL`] as ServiceProtocol | undefined) || 'http',
    url: process.env[`${name}_SERVICE_URL`] || 'localhost',
    port: process.env[`${name}_SERVICE_PORT`] || 8080,
  }
}


module.exports = {
  callInternalService,
  service: (name: string) => {
    const service = createServiceDescriptor(name);
    return options => callInternalService(service, options);
  }
}
