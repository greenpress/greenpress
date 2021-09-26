const { initializeGreenpress, waitForServerStartup } = require('../services/start');

async function startCommand({ mode, exclude }) {
  if (!exclude) {
    exclude = mode === 'prod' ? 'db' : 'none';
  }

  const child = initializeGreenpress(mode, exclude);
  await waitForServerStartup(child);

  child.onData(data => console.log(data.toString()));

  process.on('exit', child.exit);
}

module.exports = {
  startCommand
};
