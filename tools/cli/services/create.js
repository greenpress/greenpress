const fs = require('fs');
const execute = require('../utils/execute');
const { blue } = require('../utils/colors');
const { join } = require('path');

function setServiceVersion(packagePath, service, version) {
	console.log(blue(`setting ${service} to ${version}`));
	const projectPackage = require(packagePath);
	projectPackage.dependencies[`@greenpress/${service}`] = version;
	fs.writeFileSync(packagePath, JSON.stringify(projectPackage, null, 2))
}

function renameOrigin(name) {
	execute(`git remote rename origin gp`, 'rename greenpress origin to gp', { cwd: join(process.cwd(), name) });
}

async function SetupEnvForWindows(name) {
	try {
		const composePath = join(process.cwd(), name, 'compose');
		if (!(await execute('npm run envs', 
		      'create env files needed to run with docker-compose', 
		      { cwd:  composePath }))) {
				return false;
			}
		
		let envContent = '';
		const envFilePath = join(composePath, '.env');
		const envFile = fs.readFileSync(envFilePath).toString();
		
		envFile.split('\n').forEach(element => {
			if (element.includes('MONGODB_VOLUME')) {
				const volumeSpecs = element.split('=');
				envContent += `${volumeSpecs[0]}=${volumeSpecs[1].replace('/', '\\')}\n`
			} else {
				envContent += `${element}\n`;
			}
		});

		fs.truncateSync(envFilePath, 0);
		fs.writeFileSync(envFilePath, envContent);
	} catch (e) {
		console.log(red(`An error occured while setting env correctly. Error: ${e.message}`));
		return false;
	}
	
	return true;
}

module.exports = {
	setServiceVersion,
	renameOrigin,
	SetupEnvForWindows
}
