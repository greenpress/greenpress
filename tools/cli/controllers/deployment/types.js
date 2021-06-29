const { deployHeroku } = require('./heroku');
const deployments = {
	heroku: deployHeroku
};

module.exports = { deployments, deploymentTypes: Object.keys(deployments) }
