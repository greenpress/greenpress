const {chooseLocal, initializeGreenpress, waitForServerStartup} = require('../services/start');
const {green, blue, red} = require('../utils/colors');
const {appendToDockerConfig, cleanDockerConfig} = require('../services/docker-service');

const compositionType = 'local';

function useLocalServices(localServices, mode) {
    if (!localServices) {
        return;
    }

    console.log(blue(`${localServices} passed as local services, checking their validity.`));
    chooseLocal(mode, localServices);
    console.log(green('Set local services successfully!'));
}

function excludeServices(servicesToExclude) {
    if (!servicesToExclude) {
        return;
    }

    console.log(blue(`${servicesToExclude} were chosen to be excluded.`));

    try {
        appendToDockerConfig(`npm_config_x=${servicesToExclude}`);
    } catch (e) {
        console.log(red('Failed to set excluded services!'));
        throw e;
    }

    console.log(green('Excluded required services successfully!'));
}

async function startCommand(mode = 'user', options) {
    try {
        cleanDockerConfig();
        console.log(green('Cleared previous env contents!'));
        useLocalServices(options.local, mode);
        excludeServices(options.exclude);
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }

    const child = initializeGreenpress(mode);
    await waitForServerStartup(compositionType, child);
}

module.exports = {
    startCommand
};
