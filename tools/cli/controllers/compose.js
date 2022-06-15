const { join } = require('path')
const execute = require('../utils/execute');

async function composeCommand({ action, branch, tag, mongo }) {

	if (!tag) {
		execute(`git clone --branch ${branch} https://github.com/greenpress/greenpress.git`);
		tag = require(join(process.cwd(), 'greenpress', 'package.json')).version;
		execute('rm -rf greenpress');
	}

	const start = require('./compose/start');
	const pull = require('./compose/pull');

	switch (action) {
		case 'create':
			require('./compose/create')({ tag, branch, mongo });
			break;
		case 'start':
			start();
			break;
		case 'pull':
			pull();
			break;
		case 'restart':
			pull();
			start();
			console.log('Will prune old unused images soon...');
			setTimeout(require('./compose/prune'), 20000);
	}

}

module.exports = {
	composeCommand
};
