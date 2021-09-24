const execute = require('../utils/execute');

function populate(EMAIL, PASSWORD) {
  execute(`npm run populate-db`,
    'populate initial data',
    { stdio: 'inherit', env: { ...process.env, EMAIL, PASSWORD } });
}

module.exports = { populate }
