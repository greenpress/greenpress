import Fastify from 'fastify'
import FastifyVite from 'fastify-vite'
import renderer from 'fastify-vite-vue'
import fetch from 'node-fetch'

const root = import.meta.url
const app = Fastify({ logger: true })

globalThis.fetch = fetch;


globalThis.gatewayUrl = (() => {
  const protocol = process.env.GATEWAY_SERVICE_PROTOCOL || 'http';
  const url = process.env.GATEWAY_SERVICE_URL || 'localhost';
  const port = process.env.GATEWAY_SERVICE_PORT || '3000';
  return `${protocol}://${url}:${port}`;
})();

console.log('gateway API is: ', globalThis.gatewayUrl)

await app.register(FastifyVite, {
  root, renderer,
  build: process.argv.includes('build'),
  eject: process.argv.includes('eject'),
  generate: {
    enabled: process.argv.includes('generate'),
    server: {
      enabled: process.argv.includes('generate-server'),
    },
  },
})
await app.vite.commands()
await app.listen(process.env.PORT || 3002)
