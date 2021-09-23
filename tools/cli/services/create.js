const fs = require('fs');
const execute = require('../utils/execute');
const { red } = require('../utils/colors');
const { join } = require('path');

function renameOrigin(name) {
  execute(`git remote rename origin gp`, 'rename greenpress origin to gp', { cwd: join(process.cwd(), name) });
}

function setupEnvForWindows(name) {
  try {
    const composePath = join(process.cwd(), name, 'compose');
    execute('npm run envs', 'create env files needed to run with docker-compose', { cwd: composePath });

    let envContent = '';
    const envFilePath = join(composePath, '.env');
    const envFile = fs.readFileSync(envFilePath).toString();

    envFile.split('\n').forEach(element => {
      if (element.includes('MONGODB_VOLUME')) {
        const volumeSpecs = element.split('=');
        envContent += `${volumeSpecs[0]}=${volumeSpecs[1].replace('/', '\\')}\n`
      } else {
        envContent += `${element}\n`;
      }
    });

    fs.truncateSync(envFilePath, 0);
    fs.writeFileSync(envFilePath, envContent);
  } catch (e) {
    console.log(red(`An error occurred while setting env correctly. Error: ${e.message}`));
    throw e;
  }

  return true;
}

module.exports = {
  renameOrigin,
  setupEnvForWindows
}
