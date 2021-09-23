function getProcessHandler(proc) {
  let onExit, onData, onError;

  proc.stderr.on('error', (err) => {
    console.log(err.toString());
    onError && onError(err);
  });

  proc.stdout.on('data', (data) => {
    onData && onData(data);
  });

  proc.on('close', (code) => {
    console.log('process exited');
    onExit && onExit(code);
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
