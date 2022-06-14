const { composeCommand } = require('../controllers/compose');

function setComposeCommand(program) {
  program
    .command('compose [action]', 'Compose operations of Greenpress environment',
      yargs => {
        return yargs
          .positional('action', {
            describe: 'what to do?!',
            enum: ['create', 'pull', 'start'],
            type: 'string'
          })
          .option('branch', {
            alias: 'b',
            describe: 'Select a branch to use from the greenpress repository',
            default: 'main',
            type: 'string'
          })
          .option('tag', {
            alias: 't',
            describe: 'Select a tag to pull docker images (default: the tag version mentioned in branch)',
            type: 'string'
          })
      },
      composeCommand)
}

module.exports = setComposeCommand;
