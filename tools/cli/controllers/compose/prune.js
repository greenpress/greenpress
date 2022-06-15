const execute = require('../../utils/execute');

module.exports = function () {
	console.log('cleaning unused images');
	execute('docker system prune --all -f', { stdio: 'inherit' });
}
