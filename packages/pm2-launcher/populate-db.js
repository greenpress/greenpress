#!/usr/bin/env node

const { fork } = require('child_process');
const { existsSync } = require('fs');
const path = require('path');
const apps = require('./apps');
const { tenant, services } = require('./config');
const flags = require('./flags');
const [ email, password ] = getCredentials(flags);
const ONLY_POPULATE = process.env.ONLY_POPULATE ? process.env.ONLY_POPULATE.split(',') : [ 'content', 'auth' ]

function getCredentials(flags) {
	return flags.hasOwnProperty("--credentials") ?
		flags["--credentials"].split(":") :
		[ process.env.EMAIL, process.env.PASSWORD ];
}

runServicesPopulations();


function runServicesPopulations() {
	console.log('start populate data')
	Promise.all([
		runServicePopulate('content', apps.content.env),
		runServicePopulate('auth', { ...apps.auth.env, TENANT: tenant, EMAIL: email, PASSWORD: password })
	]).then((results) => {
		let [ output, code ] = getPopulateOutput(results);
		console.log(output);
		process.exit(code);
	}, () => {
		console.log('init data failed!')
		process.exit(1)
	}).catch((err) => {
		console.log(err);
		process.exit(1);
	})
}

function getPopulateOutput(results) {
	if (results[0] === 1) {
		return [ "Init data failed - Primary content is already created!", 1 ];
	}

	if (results[1] === 1) {
		return [ "Init data failed - User is already created!", 1 ];
	}

	return [ "Init data completed successfully!", 0 ];
}

function runServicePopulate(service, env) {
	if (!ONLY_POPULATE.includes(service)) {
		console.log('ignore populate service: ', service)
		return Promise.resolve();
	}
	console.log('run', service)
	const isExists = existsSync(path.join(services[service].cwd, services[service].script));
	if (!isExists) {
		console.log('script not exist for: ', service);
		return Promise.resolve();
	}
	return new Promise((resolve, reject) => {
		const folder = services[service].cwd;

		const f = fork(path.join(folder, '/helpers/init.js'), null, { env })

		f.on('close', (code) => {
			console.log(service, 'close')
			resolve(code)
		})
		f.on('error', () => {
			console.log(service, 'error')
			reject()
		})
	})

}
