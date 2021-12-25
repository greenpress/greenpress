const { getSecret } = require("../../helpers/secrets-management");
const cloudinary = require('cloudinary').v2;

class Cloudinary {
  constructor(storage) {
    this.name = storage.name;
    this.ready = getSecret(storage.tenant, storage.authentication).then((decrypted) => {
      const auth = decrypted.value;
      cloudinary.config({
        cloud_name: storage.metadata.bucketName,
        api_key: auth.accessKeyId,
        api_secret: auth.secretAccessKey,
        secure: true
      });
    });
  }

  list(prefix = '/') {

    if (prefix === '/') {
      // load all resources
      return cloudinary.api.resources();
    }

    // load resources in specific folder
    prefix = prefix.startsWith('/') ? prefix.slice(1) : prefix;
    return cloudinary.search.expression(
      `folder:${prefix}*`
    ).execute();
  }


  upload(file, options) {
    return cloudinary.uploader.upload(file, options);
  }

  remove(publicId) {
    return cloudinary.api.delete_resources([publicId]);
  }

  rename(oldIdentifier, newFileName) {
    return cloudinary.uploader.rename(oldIdentifier, newFileName);
  }
}

module.exports = Cloudinary;

