const fs = require("fs");
const execute = require("../utils/execute");
const { red } = require("../utils/colors");
const { join } = require("path");

function runNpmInstallInDirectoryAndExitIfFailed(directoryName) {
  try {
    execute(
      `npm install --prefix ${directoryName}`,
      "npm install dependencies"
    );
  } catch {
    console.log(red(`Failed to install dependencies using \`npm install\`.`));
    process.exit(1);
  }
}

function installPm2WithNpmIfMissingInDirectoryAndExitIfFailed(directoryName) {
  if (isPm2NotExists()) {
    installPm2WithNpmInDirectoryAndExitIfFailed(directoryName);
  }
}

function isPm2NotExists() {
  try {
    execute(`which pm2`, `check if \`pm2\` is installed globally`);
    return false;
  } catch (err) {
    return true;
  }
}

function installPm2WithNpmInDirectoryAndExitIfFailed(directoryName) {
  try {
    execute(`npm install pm2 --prefix ${directoryName}`, "npm install pm2");
  } catch {
    console.log(red(`Failed to install pm2 using \`npm install\`.`));
    process.exit(1);
  }
}

function renameOrigin(name) {
  execute(`git remote rename origin gp`, "rename greenpress origin to gp", {
    cwd: join(process.cwd(), name),
  });
}

function setupEnvForWindows(name) {
  try {
    const composePath = join(process.cwd(), name, "compose");
    execute(
      "npm run envs",
      "create env files needed to run with docker-compose",
      { cwd: composePath }
    );

    let envContent = "";
    const envFilePath = join(composePath, ".env");
    const envFile = fs.readFileSync(envFilePath).toString();

    envFile.split("\n").forEach((element) => {
      if (element.includes("MONGODB_VOLUME")) {
        const volumeSpecs = element.split("=");
        envContent += `${volumeSpecs[0]}=${volumeSpecs[1].replace(
          "/",
          "\\"
        )}\n`;
      } else {
        envContent += `${element}\n`;
      }
    });

    fs.truncateSync(envFilePath, 0);
    fs.writeFileSync(envFilePath, envContent);
  } catch (e) {
    console.log(
      red(`An error occurred while setting env correctly. Error: ${e.message}`)
    );
    throw e;
  }

  return true;
}

module.exports = {
  renameOrigin,
  setupEnvForWindows,
  runNpmInstallInDirectoryAndExitIfFailed,
  installPm2WithNpmIfMissingInDirectoryAndExitIfFailed,
};
