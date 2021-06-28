const cliProgress = require('cli-progress');

class ProgressBar {
	_progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

	constructor(total = 100, start = 0) {
		this._progressBar.start(total, start);
	}

	stop() {
		this._progressBar.stop();
	}

	update(progress) {
		this._progressBar.update(progress);
	}

	increment(progress = 0) {
		this._progressBar.increment(progress);
	}
}

module.exports = ProgressBar;
