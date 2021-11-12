import {execSync} from 'child_process'

try {
  console.log('running SSR build');
  const result = execSync('node app.mjs build').toString().trim();
  console.log('build result: ', result);
  if(result !== 'Generated dist/client and dist/server.') {
    process.exit(1);
  }
} catch (err) {
  console.log('failed to build SSR');
  console.log(err.message);
  process.exit(1);
}
