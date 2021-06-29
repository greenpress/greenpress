const execute = require('../utils/execute');
const { join } = require('path');
const { red } = require('../utils/colors');

async function logsController() {
	if (!(await execute('npm run logs', 
				  'show greenpress logs', 
				  { cwd: join(process.cwd(), 'compose'), stdio:'inherit'}))) {
		console.log(red('Failed to run greenpress logs!'));

		process.exit(1);
	}
}

module.exports = logsController;