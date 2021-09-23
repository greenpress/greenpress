const { startCommand } = require('../controllers/start')

function setStartCommand(program) {
  program
    .command('start [mode]', 'Start Greenpress application',
      yargs => {
        return yargs
          .positional('mode', {
            describe: 'typo of environment to run: prod or dev',
            default: 'prod',
            type: 'string'
          })
          .option('exclude', {
            alias: 'x',
            describe: 'exclude selected services (default: "db" in prod or "none" in dev)',
            type: 'string'
          })
      },
      startCommand)
}

module.exports = setStartCommand;
