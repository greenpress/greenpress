const mongoose = require('mongoose')

// define the Secret model schema
const SecretSchema = new mongoose.Schema({
  tenant: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  value: String,
});

SecretSchema.index({ tenant: 1, key: 1 }, { unique: true });

module.exports = mongoose.model('Secret', SecretSchema);
