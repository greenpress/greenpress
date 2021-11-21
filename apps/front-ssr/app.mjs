import Fastify from 'fastify'
import FastifyVite from 'fastify-vite'
import renderer from 'fastify-vite-vue'

const root = import.meta.url
const app = Fastify({ logger: true })

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
await app.listen(3000)
