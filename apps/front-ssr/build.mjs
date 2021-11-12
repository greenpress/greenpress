import {execSync} from 'child_process'

try {
  const result = execSync('node app.mjs build').toString().trim();
  console.log(result);
  if(result !== 'Generated dist/client and dist/server.') {
    process.exit(1);
  }
} catch {
  process.exit(1);
}
