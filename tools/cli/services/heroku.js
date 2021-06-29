const execute = require('../utils/execute');

async function createAddOn(name, addOnName, appName) {
	return !!(await execute(`heroku addons:create ${addOnName} -a ${appName} `, `add ${name} addons to heroku app`));
}

async function addVariable(key, value, appName) {
	await execute(`heroku config:set ${key}="${value.trim()}" -a ${appName}`, `set ${key} environment variable`)
}

module.exports = {
	createAddOn,
	addVariable
}
