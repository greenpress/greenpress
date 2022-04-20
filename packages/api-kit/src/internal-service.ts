import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

import type { Service, ServiceProtocol } from './types';

export function service(name: string): (options: AxiosRequestConfig) => AxiosPromise {
  const service = createServiceDescriptor(name);

  return (options) => callInternalService(service, options);
}

function createServiceDescriptor(name: string): Service {
  name = name.toUpperCase();

  return {
    protocol: (process.env[`${name}_SERVICE_PROTOCOL`] as ServiceProtocol | undefined) || 'http',
    url: process.env[`${name}_SERVICE_URL`] || 'localhost',
    port: process.env[`${name}_SERVICE_PORT`] || 8080,
  };
}

export function callInternalService(service: Service, options: AxiosRequestConfig): AxiosPromise {
  return axios({
    ...options,
    url: `${service.protocol}://${service.url}:${service.port}${options.url}`,
  });
}
