const upgradeController = require('../controllers/upgrade.js');

function setUpgradeCommand(program) {
	program
		.command('upgrade')
		.description('upgrade modules to their latest version')
		.action(upgradeController);
}

module.exports = setUpgradeCommand