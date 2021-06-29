const askQuestion = require('../utils/question');
const accept = require('../utils/acceptance');
const { setServiceVersion, renameOrigin, SetupEnvForWindows } = require('../services/create');
const { red, green, blue } = require('../utils/colors');
const localCompositionGuide = 'https://docs.greenpress.info/guide/local-docker-composition.html'

async function askAlternativeFront(defaultValue) {
	return accept(`Would you like to set alternative blog-front?`).then(answer => {
		if (answer) {
			return askQuestion(`Select alternative blog-front: `, defaultValue);
		}
		console.log(`Using default blog-front`);
	});
}

module.exports = async function createController(name = 'greenpress', altFront = null, mode = 'user') {
	if (!(await execute(`git clone https://github.com/greenpress/greenpress ${name}`, 
						'clone greenpress'))) {
		console.log(red(`Failed to clone application!`));
		console.log(blue('Make sure that all of Greenpress dependencies are installed - use greenpress missing'));
		process.exit(1);
	}

	const altFrontUrl = altFront || await askAlternativeFront();

	if (altFrontUrl) {
		setServiceVersion(`${process.env.PWD}/${name}/package.json`, 'blog-front', altFrontUrl);
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
