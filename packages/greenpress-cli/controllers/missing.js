const { checkDependencyVersion } = require('../services/missing');

const dependencies = [
	[ 'git', 'https://git-scm.com/downloads' ],
	[ 'docker', 'https://www.docker.com/products/docker-desktop' ],
	[ 'docker-compose', 'https://www.docker.com/products/docker-desktop' ],
	[ 'node', 'https://nodejs.org/en/download/' ] ];
	[ 'heroku', 'https://devcenter.heroku.com/articles/heroku-cli‏' ]
module.exports = function missingController() {
	dependencies.forEach(([ app, installLink ]) => checkDependencyVersion(app, installLink));
}
