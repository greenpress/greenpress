const { deploymentTypes } = require('../controllers/deployment/types');
const { deploymentCommand } = require('../controllers/deployment')

function setDeploymentCommand(program) {
	program
		.command('deployment [type]')
		.option('-mg, --mongo <mongo>', 'MongoDB URI')
		.description(`create a new deploy of Greenpress to one of the supported clouds: ${deploymentTypes.join(',')}`)
		.action(deploymentCommand);
}

module.exports = setDeploymentCommand;
