import * as axios from 'axios'

class InternalService {

/**
 *
 * @param service
 * @param options
 * @returns {AxiosPromise}
 */
function callInternalService(service, options) {
  return axios({
    ...options,
    url: `${service.protocol}://${service.url}:${service.port}${options.url}`,
  })
}

/**
 * get service url params from environment variables
 * @param {string} name
 */
function createServiceDescriptor(name) {
  name = name.toUpperCase();

  return {
    protocol: process.env[`${name}_SERVICE_PROTOCOL`] || 'http',
    url: process.env[`${name}_SERVICE_URL`] || 'localhost',
    port: process.env[`${name}_SERVICE_PORT`] || 8080,
  }
}

}
