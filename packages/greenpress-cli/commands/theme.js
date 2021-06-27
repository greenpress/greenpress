const themeCommand = require('../controllers/theme');

function setThemeCommand(program) {
	program
		.command('theme [name]')
		.option('--from <theme>', 'set base theme to be used')
		.description('create custom themes')
		.action(themeCommand);
}

module.exports = setThemeCommand;
