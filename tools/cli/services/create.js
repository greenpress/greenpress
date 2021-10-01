const fs = require("fs");
const execute = require("../utils/execute");
const { red } = require("../utils/colors");
const { join } = require("path");

function npmInstallInDirectoryAndExitIfFailed(directoryName) {
  console.log(process.cwd(), directoryName);
  try {
    execute(`npm install`, "install dependencies", {
      cwd: directoryName,
      stdio: "inherit",
    });
  } catch {
    console.log(red(`Failed to install dependencies using \`npm install\`.`));
    process.exit(1);
  }
}

function installPm2IfMissingInDirectoryAndExitIfFailed(directoryName) {
  if (shouldInstallPm2()) {
    installPm2InDirectoryAndExitIfFailed(directoryName);
  }
}

function shouldInstallPm2() {
  try {
    execute(`which pm2`, "check if `pm2` is installed globally");
    return false;
  } catch (err) {
    return true;
  }
}

function installPm2InDirectoryAndExitIfFailed(directoryName) {
  try {
    execute(`npm install pm2 ${directoryName}`, "install pm2", {
      cwd: directoryName,
      stdio: "inherit",
    });
  } catch {
    console.log(red("Failed to install pm2 using `npm install`."));
    process.exit(1);
  }
}

module.exports = {
  npmInstallInDirectoryAndExitIfFailed,
  installPm2IfMissingInDirectoryAndExitIfFailed,
};
