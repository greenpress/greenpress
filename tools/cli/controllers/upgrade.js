const { green, red } = require('../utils/colors');
const execute = require('../utils/execute');

async function upgradeController() {
  let useGpRemote;
  try {
    useGpRemote = execute('git pull', 'upgrading greenpress').result.includes('gp');
  } catch {
    console.log(red('Failed run git commands. please make sure you have git installed/'));
    process.exit(1);
  }

  const updateCmd = useGpRemote ? 'git pull gp main' : 'git pull origin main';

  try {
    execute(updateCmd, 'upgrading greenpress')
  } catch {
    console.log(red('Failed to upgrade greenpress!'), '\n', 'Consider to use git rebase manually.');
    process.exit(1);
  }

	console.log(green('Upgraded successfully!'));
}

module.exports = upgradeController
