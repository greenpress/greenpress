const execute = require('../../utils/execute');
module.exports = function ({ tenant, host }) {
	if (!host) {
		console.log('Host domain is missing, could not populate.');
		return;
	}
	execute(`docker exec greenpress_auth_1 TENANT=${tenant} node helpers/init`, { stdio: 'inherit' });
	execute(`docker exec greenpress_content_1 TENANT=${tenant} HOST=${host} node helpers/init`, { stdio: 'inherit' });
}
