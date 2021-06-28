const fs = require('fs');
const { join } = require('path');
const { red } = require('../utils/colors');

const composeConfigFile = join(process.cwd(), 'compose', 'greenpress.local.env');

function appendToDockerConfig(data) {
	try {
		if (!fs.existsSync(composeConfigFile)) {
			fs.writeFileSync(composeConfigFile, '', { flag: 'w' });
		}

		fs.appendFileSync(composeConfigFile, `${data}\n`);
	} catch (e) {
		return new Error(red(`Failed to append data to greenpress.local.env. Error: ${e.message}`));
	}
}

function cleanDockerConfig() {
	try {
		if (fs.existsSync(composeConfigFile)) {
			fs.truncateSync(composeConfigFile, 0);
		}
	} catch (e) {
		throw new Error(red(`Failed to clean greenpress.local.env. Error: ${e.message}`))
	}
}

module.exports = {
	appendToDockerConfig,
	cleanDockerConfig
}
