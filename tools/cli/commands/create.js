const createController = require('../controllers/create');

function setCreateCommand(program) {
  program
    .command('create [name] [mode]', 'create a new website using greenpress',
      (yargs) => {
        return yargs
          .positional('name', {
            describe: 'The name of your application. A folder with that name will be created here.',
            default: 'greenpress',
            type: 'string'
          })
          .positional('mode', {
            describe: '"contributor" or "user". For users - We change the remote name to "gp" instead of "origin".',
            default: 'contributor',
            type: 'string'
          })
      },
      createController)
}


module.exports = setCreateCommand;
