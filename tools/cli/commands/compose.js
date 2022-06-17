const { composeCommand } = require('../controllers/compose');

function setComposeCommand(program) {
  program
    .command('compose [action]', 'Compose operations of Greenpress environment',
      yargs => {
        return yargs
          .positional('action', {
            describe: 'what to do?!',
            choices: ['create', 'pull', 'start', 'restart', 'populate', 'prune'],
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
          .option('mongo', {
            alias: 'm',
            describe: 'Use MongoDB from given URL',
            type: 'string'
          })
          .option('populate', {
            alias: 'p',
            describe: 'Should populate (on start / restart)?',
            type: 'boolean'
          })
          .option('tenant', {
            alias: 'ten',
            describe: 'Tenant ID (for populate)',
            default: '0',
            type: 'string'
          })
          .option('host', {
            describe: 'Website host domain (mandatory for populate)',
            type: 'string'
          })
      },
      composeCommand)
}

module.exports = setComposeCommand;
