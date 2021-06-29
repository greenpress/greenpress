const missingController = require('../controllers/missing');

function setMissingCommand(program) {
	program
		.command('missing')
		.description('checks if Greenpress dependencies are installed')
		.action(missingController);
}

module.exports = setMissingCommand;
