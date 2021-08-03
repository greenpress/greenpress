const { join } = require('path');
const { renameSync } = require('fs');
const folderPath = process.cwd();
const pkg = require(join(folderPath, 'package.json'));

const filePrefix = pkg.name.replace('@', '').replace(/\//, '-');
const currentFileName = `${filePrefix}-${pkg.version}.tgz`;
const targetFileName = filePrefix + '.tgz';

console.log('replacing ' + currentFileName + ' to ' + targetFileName);
renameSync(currentFileName, targetFileName);
