const execute = require('../utils/execute');
const { renameOrigin, SetupEnvForWindows } = require('../services/create');
const { red, green, blue } = require('../utils/colors');
const localCompositionGuide = 'https://docs.greenpress.info/guide/local-docker-composition.html'

module.exports = async function createController({ name, mode }) {
	if (!(await execute(`git clone https://github.com/greenpress/greenpress ${name}`,
						'clone greenpress'))) {
		console.log(red(`Failed to clone application!`));
		console.log(blue('Make sure that all of Greenpress dependencies are installed - use greenpress missing'));
		process.exit(1);
	}


	if (mode === 'user') {
		renameOrigin(name);
	}

	if (process.platform === 'win32') {
		if (!(await SetupEnvForWindows(name))) {
			console.log(red(`Failed to set env correctly. To do so manually, follow our guide: ${blue(localCompositionGuide)}`));
			process.exit(1);
		}
	}

	console.log(green('Done!'),
		`\nEnter ${blue(name)} directory, You can run the application using: ${blue('greenpress start')}`);
	process.exit(0);
}
