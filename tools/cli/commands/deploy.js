const { deploymentTypes } = require('../controllers/deployment/types');
const { deployCommand } = require('../controllers/deploy')

function setDeployCommand(program) {
	program
		.command('deploy [type]')
		.option('-a, --app <app>', 'application name')
		.description(`deploy of Greenpress to one of the supported clouds: ${deploymentTypes.join(',')}`)
		.action(deployCommand);
}

module.exports = setDeployCommand;
