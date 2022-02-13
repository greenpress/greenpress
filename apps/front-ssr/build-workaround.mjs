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
