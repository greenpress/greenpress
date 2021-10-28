const fs = require("fs");
const { join } = require('path');

function rewriteJSON(path, pkg) {
  pkg.bundledDependencies = Object.keys(pkg.dependencies);
  fs.writeFileSync(path, JSON.stringify(pkg, null, 2));
}

function bundleDependencies(appName) {
  if (!appName) {
    console.log('app name is missing');
    return;
  }
  const pkgPath = join(__dirname, '../../apps', appName, 'package.json');
  const pkg = require(pkgPath);
  rewriteJSON(pkgPath, pkg);
  console.log('added bundled dependencies to ', pkgPath);
}

bundleDependencies(process.argv[process.argv.length - 1]);
