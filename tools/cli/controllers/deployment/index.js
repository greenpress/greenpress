const { deployHeroku } = require('./heroku');
const { green, red } = require('../../utils/colors');

async function deploymentCommand(type, cliOptions) {
	const options = {
		mongo: process.env.MONGODB_URI,
		...cliOptions
	};
	switch (type) {
		case 'heroku':
			console.log(green('deploying to heroku...'));
			await deployHeroku(options);
			break;
		default:
			console.log(red(`${type} is not supported it`));
			process.exit(1);
	}
}

module.exports = {
	deploymentCommand
}


