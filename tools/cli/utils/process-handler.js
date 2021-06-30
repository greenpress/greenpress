const { getCliStore } = require('../store/cli');

let cliStore;

function getProcessHandler(proc) {
  if (!cliStore) {
    cliStore = getCliStore();
  }
  let onExit, onData, onError;

  proc.on('error', (err) => {
    console.log(err.toString());
    onError(err);
  });

  proc.stdout.on('data', (data) => {
    console.log(data.toString());

    onData(data);
  });

  proc.on('exit', () => {
    console.log('process exited');
    onExit();
  });

  return {
    onExit: (func) => onExit = func,
    onData: (func) => onData = func,
    onError: (func) => onError = func,
    process: proc
  };
}

module.exports = {
  getProcessHandler
}
