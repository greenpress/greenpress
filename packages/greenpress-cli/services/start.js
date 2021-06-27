const fs = require('fs');
const {getStartStore} = require('../store/start');
const {join} = require('path');
const {spawn} = require('child_process');
const {appendToDockerConfig} = require('./docker-service');
const {green, blue, red, yellow} = require('../utils/colors');
const {checkImagesUp, checkServerLog} = require('./start-progress-bar');

const servicesEnvsAndRepos = {
    'auth': ['AUTH_SERVICE_CWD', 'authentication-service'],
    'secrets': ['SECRETS_SERVICE_CWD', 'secrets-service'],
    'assets': ['ASSETS_SERVICE_CWD', 'assets-service'],
    'content': ['CONTENT_SERVICE_CWD', 'content-service'],
    'admin': ['ADMIN_SERVICE_CWD', 'admin-panel'],
    'front': ['FRONT_SERVICE_CWD', 'blog-front'],
    'drafts': ['DRAFTS_SERVICE_CWD', 'drafts-service']
};

function getDevPath(service) {
    return servicesEnvsAndRepos[service] !== undefined ?
        `${servicesEnvsAndRepos[service][0]}=${join('dev', servicesEnvsAndRepos[service][1])}\n` :
        '';
}

function setLocalServicesDevPath(localServices) {
    let servicesPaths = '';
    for (const service of localServices) {
        const servicePath = getDevPath(service);
        if (servicePath !== '') {
            if (!fs.existsSync(servicePath.slice(0, -1).split('=')[1])) {
                console.log(yellow(`${service} wasn't created as local service. Skipping it!`));
                continue;
            }
            console.log(green(`Set ${service} to dev path!`));
            servicesPaths += `${servicePath}\n`;
        } else {
            console.log(red(`${service} is not a valid option!`));
            throw new Error(red('Chose invalid local options, exiting!'));
        }
    }

    return servicesPaths;
}

function chooseLocal(mode, localServices) {
    let servicesPaths = '';
    if (mode === 'dev') {
        if (localServices === 'all') {
            console.log(blue(`Chose to locally run all local services`));
            localServices = Object.keys(servicesEnvsAndRepos);
        } else {
            console.log(blue(`Chose to locally run ${localServices} services`));
            localServices = localServices.split(',');
        }
    }

    servicesPaths = setLocalServicesDevPath(localServices);
    appendToDockerConfig(servicesPaths);
}

function getAppArgs(mode) {
    return mode === 'user' ? ['run', 'local'] : ['run', 'local:dev'];
}

async function handleStartupProgress(compositionType, child) {
    const store = getStartStore();
    try {
        store.init(compositionType);
        store.startImages();
        await checkImagesUp(child);
        console.log(green('\nAll images are running!'));

        store.startServices();
        await checkServerLog();
        console.log(green('\nAll services are running!'));
    } catch (err) {
        console.log(red(`\n${err}`));
        throw err;
    } finally {
        store.stop();
    }
}

function initializeGreenpress(mode) {
    const appArgs = getAppArgs(mode);
    const childArgs = {
        cwd: join(process.cwd(), 'compose')
    };

    console.log(blue('Initializing Greenpress..\n'));
    console.log(blue('Doing our magic, might take a few minutes. Please wait.\n'));

    const child = spawn('npm', appArgs, childArgs);

    child.on('error', (err) => {
        console.log(red(`\nAn error occured while starting greenpress! Error:\n`), err);
        process.exit(1);
    });

    return getProcessHandler(child);
}

function getProcessHandler(proc) {
    let onExit, onData, onError;

    proc.on('error', (err) => {
        onError(err);
    });

    proc.stdout.on('data', (data) => {
        onData(data);
    });

    proc.on('exit', () => {
        onExit();
    });

    return {
        onExit: (func) => onExit = func,
        onData: (func) => onData = func,
        onError: (func) => onError = func,
        process: proc
    };
}

async function waitForServerStartup(compositionType, child) {
    try {
        await handleStartupProgress(compositionType, child);
        console.log(green('Server is running!'));
        console.log(`\n\rTo stop it, use: ${blue('greenpress stop')}`);
        console.log(`\rTo populate it, use: ${blue('greenpress populate')}`);
		console.log(`\rTo enter your app: http://localhost:3000`);
		console.log(`\rTo enter your app's admin panel: http://localhost:3000/gp-admin`);
        process.exit(0);
    } catch (err) {
        console.log('An error occurred during server startup');
        process.exit(1);
    }
}

module.exports = {
    chooseLocal,
    initializeGreenpress,
    waitForServerStartup
};
