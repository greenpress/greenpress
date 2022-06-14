const { existsSync } = require('fs');
const { join } = require('path');
const execute = require('../../utils/execute');
module.exports = function () {
	const shouldPopulate = !existsSync(join(process.cwd(), '..', 'apps', 'greenpress', 'db-data'));
	execute('docker-compose -f docker-compose.yml -p greenpress up -d', { stdio: 'inherit' });

	if (shouldPopulate) {
		execute('docker exec greenpress_auth_1 node helpers/init', { stdio: 'inherit' });
		execute('docker exec greenpress_content_1 node helpers/init', { stdio: 'inherit' });
	}
}
