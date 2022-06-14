const { join } = require('path')
const execute = require('../utils/execute');

async function composeCommand({ action, branch, tag, mongo }) {

	if (!tag) {
		execute(`git clone --branch ${branch} https://github.com/greenpress/greenpress.git`);
		tag = require(join(process.cwd(), 'greenpress', 'package.json')).version;
		execute('rm -rf greenpress');
	}

	switch (action) {
		case 'create':
			require('./compose/create')({ tag, branch, mongo });
	}

}

module.exports = {
	composeCommand
};
