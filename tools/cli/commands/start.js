const { startCommand } = require('../controllers/start')

function setStartCommand(program) {
	program
		.command('start [mode]')
		.option('-l, --local <services>', 'running selected services in dev mode')
		.option('-x, --exclude <services>', 'exclude selected services (default db in prod or none in dev)')
		.description('start Greenpress application')
		.action(startCommand);
}

module.exports = setStartCommand;
