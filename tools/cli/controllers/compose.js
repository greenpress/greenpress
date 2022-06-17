const { join } = require('path')
const execute = require('../utils/execute');
const pull = require('./compose/pull');

async function composeCommand({ action, branch, tag, mongo, populate, tenant }) {

	if (!tag) {
		execute(`git clone --branch ${branch} https://github.com/greenpress/greenpress.git`);
		tag = require(join(process.cwd(), 'greenpress', 'package.json')).version;
		execute('rm -rf greenpress');
	}

	const start = require('./compose/start');
	const pull = require('./compose/pull');
	const prune = require('./compose/prune');

	switch (action) {
		case 'create':
			require('./compose/create')({ tag, branch, mongo });
			break;
		case 'start':
			start({ populate, tenant });
			break;
		case 'pull':
			pull();
			break;
		case 'prune':
			prune();
			break;
		case 'restart':
			pull();
			start({ populate, tenant });
			console.log('Will prune old unused images soon...');
			setTimeout(prune, 20000);
	}

}

module.exports = {
	composeCommand
};
