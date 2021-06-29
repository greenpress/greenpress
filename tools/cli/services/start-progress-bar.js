const { getStartStore } = require('../store/start');
const { red } = require('../utils/colors');
const { spawn } = require('child_process');

function checkImagesUp(child) {
	return new Promise((resolve, reject) => {
		const store = getStartStore();
		child.onError((err) => {
			console.log(red(`An error occurred while checking images startup. Error: ${err}`));
			reject('Failed to run all images!');
		});

		let stepOutputEncountered = false;
		child.onData((data) => {
			const dataString = data.toString();
			if (dataString.includes('Step')) {
				stepOutputEncountered = true;
			}

			if (!stepOutputEncountered || 
				(stepOutputEncountered &&  !dataString.includes('Successfully built'))) {
				store.sendOutput(data.toString());
			}
		});

		child.onExit(() => {
			store.setStep('images', 'greenpress');
			if (store.isProgressTypeResolved()) {
				resolve();
			}
		});
	});
}

function checkServerLog() {
	return new Promise((resolve, reject) => {
		const logs = spawn('docker', [ 'logs', 'greenpress_greenpress_1', '--follow' ]);
		const store = getStartStore();
		logs.on('error', (err) => {
			reject(`Failed to run all services! error: ${err}`);
		});

		logs.on('exit', (data) => {
			console.log(data);
			reject('premature exit');
		});

		logs.stdout.on('data', (data) => {
			const output = data.toString();
			if (output.includes('PM2 successfully stopped')) {
				reject(`PM2 stopped. Latest output before error:\n ${output}`);
			} else {
				store.sendOutput(output)
			}

			if (store.isProgressTypeResolved()) {
				resolve();
			}
		});
	});
}

module.exports = {
	checkImagesUp,
	checkServerLog
}
