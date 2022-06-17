async function composeCommand({ action, branch, tag, mongo, populate, tenant, host }) {
	const start = require('./compose/start');
	const pull = require('./compose/pull');
	const prune = require('./compose/prune');

	switch (action) {
		case 'create':
			require('./compose/create')({ tag, branch, mongo });
			break;
		case 'start':
			start({ populate, tenant, host });
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
			start({ populate, tenant, host });
			console.log('Will prune old unused images soon...');
			setTimeout(prune, 20000);
	}

}

module.exports = {
	composeCommand
};
