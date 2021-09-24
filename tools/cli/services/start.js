const { getProcessHandler } = require('../utils/process-handler');
const { spawn } = require('child_process');
const { green, blue } = require('../utils/colors');

function handleStartupProgress(child) {
  return new Promise((resolve, reject) => {
    child.onError(reject);
    child.onExit(code => code === 0 ? resolve() : reject());
    child.onData(data => {
      if (data.toString().includes('READY  Server listening')) {
        resolve();
      }
    });
  })
}

function initializeGreenpress(mode, exclude) {
  const startCmd = mode === 'prod' ? [ 'start', `--x=${exclude}` ] : [ 'run', 'dev', `--x=${exclude}` ];
  const childArgs = {
    stdio: 'pipe',
  };

  console.log(blue('Initializing Greenpress..\n'));
  console.log(blue('Doing our magic, might take a few minutes. Please wait.\n'));

  return getProcessHandler(spawn('npm', startCmd), childArgs);
}

async function waitForServerStartup(child) {
  try {
    await handleStartupProgress(child);
    console.log(green('Server is running!'));
    console.log(`\n\rTo stop it, use: ${blue('greenpress stop')}`);
    console.log(`\rTo populate it, use: ${blue('greenpress populate')}`);
    console.log(`\rTo enter your app: http://localhost:3000`);
    console.log(`\rTo enter your app's admin panel: http://localhost:3000/gp-admin/`);
  } catch (err) {
    console.log('An error occurred during server startup');
    process.exit(1);
  }
}

module.exports = {
  initializeGreenpress,
  waitForServerStartup
};
