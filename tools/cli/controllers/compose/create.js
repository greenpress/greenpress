const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const execute = require('../../utils/execute');
const { getRandomHash } = require('../../services/hashing');

module.exports = function ({ tag, branch, mongo }) {
	execute(`git clone --branch ${branch} https://github.com/greenpress/greenpress.git`);

	const envs = readFileSync(join(process.cwd(), 'greenpress', 'compose', '.env.example'), 'utf-8');

	const secrets = [
		"JWT_SECRET",
		"REFRESH_TOKEN_SECRET",
		"SECRETS_SERVICE_SECRET",
		"ASSETS_SECRETS_TOKEN",
		"INTERNAL_SECRET"
	]

	const newEnvFile = envs
		.split('\n')
		.map(line => secrets.includes(line.replace('=', '')) ? `${line}${getRandomHash()}` : line)
		.join('\n')
		.replaceAll('latest', tag.startsWith('v') ? tag : `v${tag}`)
		.replaceAll('mongodb://mongo/greenpress', mongo || 'mongodb://mongo/greenpress')

	const yamlName = mongo ? 'docker-compose.persistent.yml' : 'docker-compose.yml';

	writeFileSync(join(process.cwd(), '.env'), newEnvFile);
	writeFileSync(join(process.cwd(), yamlName), readFileSync(join(process.cwd(), 'greenpress', 'compose', 'docker-compose.yml'), 'utf-8'));

	execute(`rm -rf greenpress`);
}
