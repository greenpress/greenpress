const { getProgressBarStore } = require('./progress-bar');

class StartStore {
	state = {
		compositionType: 'local',
		progressType: 'images',
		incrementedComponents: {
			step1: false,
			step2: false,
			step3: false,
			step4: false,
			step5: false,
			step6: false,
			step7: false,
			greenpress: false,
			admin: false,
			assets: false,
			auth: false,
			content: false,
			drafts: false,
			secrets: false,
			front: false
		},
	};

	constructor() {
		this._progressBarStore = getProgressBarStore();
	}

	init(compositionType = 'local') {
		this.state.compositionType = compositionType;
		if (compositionType === 'local') {
			this.state.componentsDetails = {
				images: {
					step1: [ "Step 1/8", 2.5 ],
					step2: [ "Step 2/8", 2.5 ],
					step3: [ "Step 3/8", 2.5 ],
					step4: [ "Step 4/8", 2.5 ],
					step5: [ "Step 5/8", 2.5 ],
					step6: [ "Step 6/8", 2.5 ],
					step7: [ "Step 7/8", 2.5 ],
					greenpress: [ null, 2.5 ],
					alreadyBuilt: ['Successfully built', 17.5]
				},
				services: {
					admin: [ "Admin front-server is up on port", 10 ],
					assets: [ "Assets Service is running on port", 10 ],
					auth: [ "Authentication Service is running on port", 10 ],
					content: [ "Content Service is running on port", 10 ],
					drafts: [ "Drafts Service is running on port", 10 ],
					secrets: [ "Secrets Service is running on port", 10 ],
					front: [ "READY  Server listening", 20 ]
				}
			};
		}

		this.state.components = Object.keys(this.state.componentsDetails);
	}

	startImages() {
		this.state.progressType = 'images';
		this._progressBarStore.start(20);
	}

	startServices() {
		this.state.progressType = 'services';
		this._progressBarStore.start(80);
	}

	stop() {
		this._progressBarStore.stop();
	}

	sendOutput(output) {
		const { components, componentsDetails, incrementedComponents } = this.state;
		components.forEach((component) => {
			Object.entries(componentsDetails[component]).forEach((element) => {
				const [ searchText, progress ] = element[1];
				if (searchText && !incrementedComponents[element[0]] && output.includes(searchText)) {
					this._progressBarStore.increment(progress || 0);
					incrementedComponents[element[0]] = true;
			}
		});
	});
	}

	setStep(componentType, stepName) {
		const { componentsDetails, incrementedComponents } = this.state;
		const [ _, progress ] = componentsDetails[componentType][stepName];

		if (!incrementedComponents[stepName]) {
			this._progressBarStore.increment(progress || 0);
			incrementedComponents[stepName] = true;
		}
	}

	isProgressTypeResolved() {
		return this._progressBarStore.isResolved();
	}
}

let store;

module.exports = {
	getStartStore() {
		if (!store) {
			store = new StartStore();
		}
		return store;
	}
}
