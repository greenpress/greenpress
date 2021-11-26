// @ts-ignore
import {useHydration, isServer} from 'fastify-vite-vue/client.mjs';

export default async function usePayload() {
  const ctx = await useHydration();
  if (isServer || ctx.$payload) {
    return ctx.$payload;
  }
  ctx.$loading = true
  const response = await fetch(ctx.$payloadPath())
  const payload = await response.json()
  ctx.$loading = false

  return payload;
}
