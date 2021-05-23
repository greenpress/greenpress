function readUserArgs() {
	
	// read command line
	let cliInput = process.argv.slice(2);
	
	let flags = {};
	for (let i = 0; i < cliInput.length; i += 2) {
		flags[cliInput[i]] = cliInput[i + 1];
	}

	return flags;
}

const flags = readUserArgs();

module.exports = flags;