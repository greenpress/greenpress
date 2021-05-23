const mongoose = require('mongoose')

// define the Storage model schema
const StorageSchema = new mongoose.Schema({
  tenant: {
    type: String,
    index: true,
    required: true,
  },
  kind: {
    type: String,
    enum: ['s3', 'gcs', 'ftp'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  metadata: {
    publicUrl: {
      type: String,
      required: true
    },
    basePath: {
      type: String,
      default: '/',
      required: true
    },
    bucketName: {
      type: String,
    }
  },
  authentication: String
})

module.exports = mongoose.model('Storage', StorageSchema)
