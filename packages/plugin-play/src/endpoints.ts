import {RouteOptions} from 'fastify/types/route';
import {join} from 'path';
import manifest from './manifest';

export const endpoints = new Map<string, RouteOptions>()

export function addProxyEndpoint(path: string, options: Partial<RouteOptions>) {
  endpoints.set(join(manifest.apiPath, path), {
    ...options,
    url: path,
    method: options.method || 'GET',
    handler: options.handler
  })
}

export function addEndpoint(path: string, options: Partial<RouteOptions>) {
  endpoints.set(path, {
    ...options,
    url: path,
    method: options.method || 'GET',
    handler: options.handler
  })
}
