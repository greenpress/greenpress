const {execSync} = require('child_process');
const {unlinkSync} = require('fs');
const path = require('path');
const themeName = process.env.THEME || 'default';
const isWin = process.platform === 'win32';

function getThemePath(theme) {
	const globalKeyWord = 'global:';
	return theme.includes(globalKeyWord) ? path.resolve(theme.replace(globalKeyWord, '')) : `themes/${theme}/`;
}

function getLinuxExec(theme) {
	const themePath = getThemePath(theme);
	return `ln -s ${themePath} .current_theme`;
}

function getWindowsExec(theme) {
	const themePath = getThemePath(theme);
	return `mklink /J ".current_theme" "${themePath}"`
}

try {
	console.log('removing previous link, if exists..');
	unlinkSync('.current_theme');
	console.log('done.');
}
catch (e) {
	console.log('previous symlink does not exist.');
}
console.log('using theme as mentioned:', themeName);
console.log('creating theme symlink..');
execSync(isWin ? getWindowsExec(themeName) : getLinuxExec(themeName));
console.log('symlink of theme created. you can build the front now.');
