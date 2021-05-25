const Secret = require('./models/secret');

function getItem(tenant, key) {
  return Secret.findOne({ tenant, key }).lean();
}

function setItem(tenant, key, value) {
  return Secret.findOneAndUpdate({ tenant, key }, { $set: { tenant, key, value } }, { upsert: true });
}

module.exports = {
  getItem,
  setItem
};
