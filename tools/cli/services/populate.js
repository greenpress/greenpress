const execute = require('../utils/execute');

function populate(email, password) {
	execute(`docker exec greenpress_greenpress_1 npm run populate-db -- --credentials ${email}:${password}`, 
		'populate initial data', { stdio: 'inherit' });
}

module.exports = { populate }
