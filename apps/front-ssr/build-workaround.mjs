import { readFile, writeFile } from 'fs/promises'


try {
	const lib = await readFile('./node_modules/fastify-vite/index.js');
	await writeFile('./node_modules/fastify-vite/index.js',
		lib.toString().replaceAll('process.exit()', 'process.exit(0)')
	);
	console.log('fastify-vite workaround changed')
} catch {
	console.log('fastify-vite folder not found')
}

try {
	const lib = await readFile('./node_modules/fastify-vite-vue/render.js');
	await writeFile('./node_modules/fastify-vite-vue/render.js',
		lib.toString()
			.replace(
				`      const clientRoutes = routes.map(({
        path,
        getPayload,
        getData,
        componentPath,
      }) => {`,
				`      const clientRoutes = routes.map(({
        name,
        path,
        getPayload,
        getData,
        componentPath,
      }) => {`)
			.replace(
				`      }) => {
        return {
          hasPayload: !!getPayload,
          hasData: !!getData,
          path,
          componentPath,
        }
      })`,
				`      }) => {
        return {
          name,
          hasPayload: !!getPayload,
          hasData: !!getData,
          path,
          componentPath,
        }
      })`
			)
	);
	console.log('fastify-vite-vue render workaround changed')
} catch {
	console.error('fastify-vite-vue render failed to change')
	process.exit(1)
}


try {
	const lib = await readFile('./node_modules/fastify-vite-vue/routing.js');
	await writeFile('./node_modules/fastify-vite-vue/routing.js',
		lib.toString()
			.replace(
				`
function getPayloadHandler (scope, getPayload) {
  return async function (req, reply) {
    req.payload = await getPayload({
      fetch,
      app: scope,
      req,
      reply,
    })
  }
}`,
				`
function getPayloadHandler (scope, getPayload) {
  return async function (req, reply) {
    req.payload = await getPayload({
      fetch,
      app: scope,
      req,
      reply,
    })
    return req.payload;
  }
}`)
	);
	console.log('fastify-vite-vue routing workaround changed')
} catch {
	console.error('fastify-vite-vue routing failed to change')
	process.exit(1)
}


