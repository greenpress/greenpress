const execute = require('../../utils/execute');
module.exports = function ({ tenant }) {
	execute(`docker exec greenpress_auth_1 TENANT=${tenant} node helpers/init`, { stdio: 'inherit' });
	execute(`docker exec greenpress_content_1 TENANT=${tenant} node helpers/init`, { stdio: 'inherit' });
}
