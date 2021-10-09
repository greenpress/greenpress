const execute = require("../utils/execute");
const { installNodeDependencies } = require("../services/create");
const { red, green, blue } = require("../utils/colors");

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

  installNodeDependencies(name);

  console.log(
    green("Done!"),
    `\nEnter ${blue(name)} directory, You can run the application using: ${blue(
      "greenpress start"
    )}`
  );
  process.exit(0);
};
