const { existsSync } = require('fs');
const { join } = require('path');
const execute = require('../../utils/execute');
module.exports = function ({ populate: shouldPopulate, tenant }) {
	shouldPopulate = shouldPopulate && !existsSync(join(process.cwd(), '..', 'apps', 'greenpress', 'db-data'));
	console.log('running the app')
	execute('docker-compose -f docker-compose.yml -p greenpress up -d', { stdio: 'inherit' });

	console.log('Done!');
	if (shouldPopulate) {
		console.log('seems like your first run, so we populate the database.')
		require('./populate')({ tenant })

		console.log('Done. login to your admin:')
		console.log('Username: test@test.com')
		console.log('Password: admin')
	}
}
