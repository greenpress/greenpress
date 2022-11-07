const populateController = require('../controllers/populate');

function setPopulateCommand(program) {
  program
    .command(
      'populate',
      'initiates the database with initial categories, a post, the main menu, and your first administrator user',
      yargs => {
        return yargs
          .option('tenant', {
            alias: 'ten',
            describe: 'Tenant ID (for populate)',
            default: '0',
            type: 'string'
          })
          .option('host', {
            describe: 'Website host domain (mandatory for populate)',
            default: 'localhost',
            type: 'string'
          })
          .option('email', {
            alias: 'e',
            describe: 'First user email address',
            type: 'string'
          })
          .option('password', {
            alias: 'p',
            describe: 'First user password',
            type: 'string'
          });
      },
      populateController);
}

module.exports = setPopulateCommand

