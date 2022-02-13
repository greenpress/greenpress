import { readFile, writeFile } from 'fs/promises'


try {
  const lib = await readFile('./node_modules/fastify-vite/index.mjs');
  await writeFile('./node_modules/fastify-vite/index.mjs',
    lib.toString().replaceAll('process.exit()', 'process.exit(0)')
  );
} catch {
  console.log('fastify-vite folder not found')
}
