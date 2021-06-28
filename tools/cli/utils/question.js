const readline = require('readline');

module.exports = function askQuestion(question, defaultValue) {
	const questionInterface = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	return new Promise((resolve) => {
		questionInterface.question(question,
			(input) => {
				questionInterface.close();
				resolve(input || defaultValue);
			});
	});
}
