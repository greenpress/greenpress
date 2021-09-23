const upgradeController = require('../controllers/upgrade.js');

function setUpgradeCommand(program) {
	program
		.command('upgrade', 'upgrade modules to their latest version', yargs => yargs, upgradeController);
}

module.exports = setUpgradeCommand
