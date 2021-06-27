const { green, blue, red } = require('../utils/colors');
const execute = require('../utils/execute');
const { join } = require('path');

function stopCommand() {

	console.log(blue('Stopping greenpress...'));
	let errN = execute('npm run stop', 'stop greenpress container', { cwd: join(process.cwd(), 'compose')}) ? 0 : 1;

	if (errN) {
		console.log(red(`Greenpress failed to stop, failed on ${errN} steps.`));
		process.exit(1);
	}

	console.log(green("Greenpress stopped"));
	process.exit(0);
}

module.exports = {
	stopCommand
}