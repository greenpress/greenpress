const { red } = require('../utils/colors');
const { execSync } = require('child_process');

module.exports = async function execute(cmd, actionDescription, execProps = {stdio: 'pipe'}) {
	try {
		execSync(cmd, execProps, (error, stdout, stderr) => {
			if (error) {
				console.log(red(actionDescription ? `Failed to ${actionDescription}: ${error.message}` : error.message));
				
				return false;
			}
			
			if (stderr) {
				console.log(red(actionDescription ? `Error occurred while trying to ${actionDescription}: ${stderr.message}` : stderr));
				
				return false;
			}
			
			console.log(stdout);
		});
	} catch (error) {
		console.log(red(actionDescription ? `Error occurred while trying to ${actionDescription}: ${error.message}`: error.message));

		return false;
	}

	return true;
}
