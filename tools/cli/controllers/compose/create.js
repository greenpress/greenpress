const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const execute = require('../../utils/execute');
const { getRandomHash } = require('../../services/hashing');

module.exports = function ({ tag, branch }) {
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
		.replaceAll('latest', tag.startsWith('v') ? tag : `v${tag}`);

	writeFileSync(join(process.cwd(), '.env'), newEnvFile);
	writeFileSync(join(process.cwd(), 'docker-compose.yml'), readFileSync(join(process.cwd(), 'greenpress', 'compose', 'docker-compose.yml'), 'utf-8'));

	execute(`rm -rf greenpress`);
}