const populateController = require('../controllers/populate');

function setPopulateCommand(program) {
	program
		.command(
		  'populate',
      'initiates the database with initial categories, a post, the main menu, and your first administrator user',
        a => a,
      populateController);
}

module.exports = setPopulateCommand

