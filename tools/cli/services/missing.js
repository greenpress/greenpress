const { execSync } = require('child_process');
const { green, red, blue } = require('../utils/colors');

function checkDependencyVersion(app, installLink) {
	const errMsg = `${red(`${app} is not installed! To download:`)} ${blue(installLink)}`;
	try {
		const versionCommand = app + " --version";
		const version = execSync(versionCommand).toString();
		if (version.includes('not')) {
			console.log(errMsg);
		} else {
			console.log(`${green(`${app} is installed!`)} Installed version: ${version}`);
		}
	} catch (err) {
		console.log(errMsg);
	}
}

module.exports = { checkDependencyVersion };
