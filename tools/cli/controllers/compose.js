const start = require('./compose/start');
const execute = require('../utils/execute');

async function composeCommand({ action, branch, tag, mongo, populate, tenant, host }) {
	const start = require('./compose/start');
	const pull = require('./compose/pull');
	const prune = require('./compose/prune');

	const doStart = () => start({ populate, tenant, host });

	switch (action) {
		case 'create':
			require('./compose/create')({ tag, branch, mongo });
			break;
		case 'start':
			doStart();
			break;
		case 'pull':
			pull();
			break;
		case 'prune':
			prune();
			break;
		case 'populate':
			require('./compose/populate')({ tenant, host });
			break;
		case 'restart':
			pull();
			try {
				doStart();
			} catch (e) {
				console.log('we encountered an error on start. starting over immediately.');
				execute('docker rm -f $(docker ps -aq)', { stdio: 'inherit' });
				doStart();
			}
			console.log('Will prune old unused images soon...');
			setTimeout(prune, 20000);
	}

}

module.exports = {
	composeCommand
};
