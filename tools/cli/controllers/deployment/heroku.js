const execute = require('../../utils/execute');
const { getRandomHash } = require('../../services/hashing');
const { createAddOn, addVariable } = require('../../services/heroku');
const { green, red, blue } = require('../../utils/colors');
const askQuestion = require('../../utils/question');
const addOns = {
	redis: 'heroku-redis',
	papertrail: 'papertrail'
}
const secrets = [
	"JWT_SECRET",
	"REFRESH_TOKEN_SECRET",
	"SECRETS_SERVICE_SECRET",
	"ASSETS_SECRETS_TOKEN",
	"INTERNAL_SECRET"
]

async function deployHeroku({ mongo }) {
	if (!await execute('heroku login', 'login to heroku')) {
		console.log(red(`login failed`));
		console.log('Make sure you have installed the Heroku CLI an logged in to your account.');
		console.log('You can find more help at this manual: ' + blue('https://devcenter.heroku.com/articles/heroku-cli'));
		process.exit(1);
	}
	console.log(green(`login successfully to heroku`));
	const appName = await askQuestion('what is your application name:', `greenpress_${Date.now()}`)
	//TODO add try to askQuestion function
	console.log(green(`heroku creating app ${appName}`));
	if (!await execute(`heroku create ${appName}`, 'create heroku app')) {
		console.log(red(`create app ${appName} failed`));
		process.exit(1);
	}
	for (let key in addOns) {
		if (!await createAddOn(key, addOns[key], appName)) {
			console.log(red(`failed to install ${key} in ${appName}`));
			process.exit(1);
		}
	}
	const mongoUri = (await askQuestion('what is your mongo URI:', mongo)) || mongo;
	if (!mongoUri.trim()) {
		console.log(red(`mongo URI must be provided`));
		process.exit(1);
	}
	if (!await addVariable('MONGODB_URI', mongoUri, appName)) {
		console.log(red(`failed to set mongo uri`));
		process.exit(1);
	}
	await Promise.all(secrets.map(async secret => {
		if (!await addVariable(secret, getRandomHash(), appName)) {
			console.log(red(`hash to environment ${secret} failed`));
			process.exit(1);
		}
	}))
}

module.exports = {
	deployHeroku
}


