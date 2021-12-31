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
    enum: ['s3', 'gcs', 'ftp', 'cloudinary'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  metadata: {
    publicUrl: {
      type: String,
      required: isPublicUrlRequired
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


function isPublicUrlRequired() {
  return this.kind !== 'cloudinary';
}

module.exports = mongoose.model('Storage', StorageSchema)
