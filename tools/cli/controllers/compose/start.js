const { existsSync } = require('fs');
const { join } = require('path');
const execute = require('../../utils/execute');
module.exports = function () {
	const shouldPopulate = !existsSync(join(process.cwd(), '..', 'apps', 'greenpress', 'db-data'));
	console.log('running the app')
	execute('docker-compose -f docker-compose.yml -p greenpress up -d', { stdio: 'inherit' });

	console.log('Done!');
	if (shouldPopulate) {
		console.log('seems like your first run, so we populate the database.')
		execute('docker exec greenpress_auth_1 node helpers/init', { stdio: 'inherit' });
		execute('docker exec greenpress_content_1 node helpers/init', { stdio: 'inherit' });

		console.log('Done. login to your admin:')
		console.log('Username: test@test.com')
		console.log('Password: admin')
	}
}
