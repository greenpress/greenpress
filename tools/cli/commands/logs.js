const logsController = require('../controllers/logs');

function setLogsCommand(program) {
	program
		.command('logs')
		.description('display greenpress logs')
		.action(logsController)
}


module.exports = setLogsCommand;