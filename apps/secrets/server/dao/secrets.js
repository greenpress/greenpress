const { mongoUri } = require('../../config');

let secretModel;
if (mongoUri) {
  require('./mongo/connect')(mongoUri);
  secretModel = require('./mongo/secret');
}

module.exports = {
  getItem: (tenant, key) => secretModel.getItem(tenant, key),
  setItem: (tenant, key, value) => secretModel.setItem(tenant, key, value),
}
