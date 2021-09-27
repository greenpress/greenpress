const execute = require("../utils/execute");
const {
  renameOrigin,
  setupEnvForWindows,
  runNpmInstallInDirectoryAndExitIfFailed,
  installPm2WithNpmIfMissingInDirectoryAndExitIfFailed,
} = require("../services/create");
const { red, green, blue } = require("../utils/colors");
const localCompositionGuide =
  "https://docs.greenpress.info/guide/local-docker-composition.html";

module.exports = function createController({ name, mode }) {
  try {
    execute(
      `git clone https://github.com/greenpress/greenpress ${name}`,
      "clone greenpress"
    );
  } catch {
    console.log(red(`Failed to clone application!`));
    console.log(
      blue(
        "Make sure that all of Greenpress dependencies are installed - use greenpress missing"
      )
    );
    process.exit(1);
  }

  runNpmInstallInDirectoryAndExitIfFailed(name);

  installPm2WithNpmIfMissingInDirectoryAndExitIfFailed(name);

  if (mode === "user") {
    renameOrigin(name);
  }

  if (process.platform === "win32") {
    try {
      setupEnvForWindows(name);
    } catch {
      console.log(
        red(
          `Failed to set env correctly. To do so manually, follow our guide: ${blue(
            localCompositionGuide
          )}`
        )
      );
      process.exit(1);
    }
  }

  console.log(
    green("Done!"),
    `\nEnter ${blue(name)} directory, You can run the application using: ${blue(
      "greenpress start"
    )}`
  );
  process.exit(0);
};
