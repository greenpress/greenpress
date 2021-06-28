const { green, red } = require('../utils/colors');
const execute = require('../utils/execute');

async function upgradeController() {
	if (!execute('git pull', 'upgrading greenpress')) {
		console.log(red('Failed to upgrade greenpress!'));
		process.exit(1);
	}
	
	console.log(green('Upgrade ended successfully!'));
}

module.exports = upgradeController