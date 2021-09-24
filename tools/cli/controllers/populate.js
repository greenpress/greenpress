const askQuestion = require('../utils/question');
const accept = require('../utils/acceptance');
const { populate } = require('../services/populate');
const { blue } = require('../utils/colors');

async function readCredential(credentialType, defaultValue) {
  const bool = await accept(`Would you like to select ${credentialType}?`);

  if (!bool) {
    console.log(blue(`Using default ${credentialType} (${defaultValue})`));
    return defaultValue;
  }

  const input = await askQuestion(`Select new ${credentialType}: `, defaultValue);
  console.log(`Setting ${credentialType} to ${input}`);
  return input;
}

module.exports = async function populateController({ email, password }) {
  if (!email) {
    email = await readCredential('email', 'test@test.com');
  }
  if (!password) {
    password = await readCredential('password', 'admin');
  }

  populate(email, password);
}
