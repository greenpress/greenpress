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

  async list(path = '/') {
    return new Promise((resolve, reject) => {
      const options = { prefix: path.slice(1) };
      cloudinary.api.resources(options, function (error, result) {
        if (error) {
          reject({ message: 'could not retrieve assets from storage: ' + this.name });
        }

        resolve(result);
      });

    });
  }

}

module.exports = Cloudinary;

