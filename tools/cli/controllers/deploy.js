const execute = require('../utils/execute');
const { green, red } = require('../utils/colors');

async function deployCommand(type, { app }) {
	switch (type) {
		case 'heroku':
			console.log(green('deploying to heroku...'));
			await deployHeroku(app);
			break;
		default:
			console.log(red(`${type} is not supported it`));
			process.exit(1);
	}
}

async function deployHeroku(appName = process.env.HEROKU_APP) {
	if (!await execute(`heroku git:remote -a ${appName}`, 'create heroku app')) {
		console.log(red(`create app ${appName} remote repository failed`));
		process.exit(1);
	}

	await execute(`git push heroku master -f`, 'deploy to heroku', { stdio: 'inherit' });
}

module.exports = {
	deployCommand
}


