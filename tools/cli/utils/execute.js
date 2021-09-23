const { red } = require('../utils/colors');
const { execSync } = require('child_process');

module.exports = function execute(cmd, actionDescription, execProps = { stdio: 'pipe' }) {
  let result;
  try {
    result = execSync(cmd, execProps);
  } catch (error) {
    console.log(red(actionDescription ? `Error occurred while trying to ${actionDescription}: ${error.message}` : error.message));
    throw error;
  }

  return {
    result
  };
}
