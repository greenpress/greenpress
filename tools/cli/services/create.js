const fs = require("fs");
const execute = require("../utils/execute");
const { red } = require("../utils/colors");

function installNodeDependencies(directoryName) {
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

module.exports = {
  installNodeDependencies,
};
