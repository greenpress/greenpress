import {FastifyRequest} from 'fastify/types/request';

export const handlers = {
  refreshToken: [],
  newTenant: [],
  manifest: [],
  storeUser: [],
}

export type StandardPayload = { sub: string, identifier: string };

export function onRefreshToken<T = any>(handler: (tokenPayload: T, request: FastifyRequest) => void | { payload: T & StandardPayload } | Promise<void | { payload: T & StandardPayload }>) {
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
