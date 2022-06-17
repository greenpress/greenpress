const execute = require('../../utils/execute');
module.exports = function ({ tenant, host }) {
	if (!host) {
		console.log('Host domain is missing, could not populate.');
		return;
	}
	execute(`docker exec greenpress_auth_1 node helpers/init`, { stdio: 'inherit', env: { TENANT: tenant, HOST: host } });
	execute(`docker exec greenpress_content_1 node helpers/init`, { stdio: 'inherit', env: { TENANT: tenant, HOST: host } });
}
