const fs = require("fs");

const ROOT = "./apps";

function mapAppNames() {
  return fs.readdirSync(ROOT).map((folder) => ({ folder, files: [] }));
}

function mapAppFiles(apps) {
  return apps.map((app) => ({
    ...app,
    files: fs.readdirSync(`${ROOT}/${app.folder}`).map((file) => file),
  }));
}

function filterWithPackageJSON(appFiles) {
  return appFiles.filter((app) => app.files.includes("package.json"));
}

function buildPackagePath(app) {
  return `${ROOT}/${app.folder}/package.json`;
}

function getDependencies(app) {
  const rawData = fs.readFileSync(app);
  const JSONData = JSON.parse(rawData);
  const JSONDependencies = JSONData.dependencies;
  const dependencyKeys = Object.keys(JSONDependencies);
  JSONData.bundledDependencies = dependencyKeys;
  return { path: app, JSONData };
}

function rewriteJSON(app) {
  fs.writeFile(app.path, JSON.stringify(app.JSONData, null, 2), err => err  ? console.log(err) : void 0);
}

function bundleDependencies() {
  const apps = mapAppNames();
  const appFiles = mapAppFiles(apps);
  const withPackages = filterWithPackageJSON(appFiles);
  const withPaths = withPackages.map((app) => buildPackagePath(app));
  const replaced = withPaths.map((app) => getDependencies(app));
  replaced.forEach(app => rewriteJSON(app));
}

bundleDependencies();
