import {FastifyRequest} from 'fastify/types/request';

export const handlers = {
  refreshToken: [],
  newTenant: [],
  manifest: [],
  storeUser: [],
}

export function onRefreshToken<T = any>(handler: (tokenPayload: T, request: FastifyRequest) => void | { payload: T } | Promise<void | { payload: T }>) {
  handlers.refreshToken.push(handler);
}

export function onNewTenant(handler) {
  handlers.newTenant.push(handler);
}

export function onManifest(handler) {
  handlers.manifest.push(handler);
}

export function onStoreUser(handler) {
  handlers.storeUser.push(handler);
}

export default handlers;
