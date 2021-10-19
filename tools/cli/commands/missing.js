const missingController = require('../controllers/missing');

function setMissingCommand(program) {
	program
		.command('missing', 'checks if Greenpress dependencies are installed', missingController);
}

module.exports = setMissingCommand;
