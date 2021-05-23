const { Storage } = require('@google-cloud/storage');
const { getSecret } = require('../../helpers/secrets-management');
const ASSET_TYPES = require('../../helpers/asset-types.json');


class Gcs {
  constructor(storage) {
    this.name = storage.name;
    this.ready = getSecret(storage.tenant, storage.authentication).then(
      (decrypted) => {
        const auth = decrypted.value;
        this._client = new Storage({
          projectId: auth.projectId,
          scopes: 'https://www.googleapis.com/auth/cloud-platform',
          credentials: {
            client_email: auth.clientEmail,
            private_key: auth.privateKey
          }
        });
        this.bucket = this._client.bucket(storage.metadata.bucketName);
      },
      () => {
        throw new Error('could not read GCS credentials');
      }
    );
  }

  async list(path) {
    return new Promise((resolve, reject) => {
      const filesAndFolders = [];

      let cb = (err, files, next, apiResponse) => {
        if (err) {
          return reject({ message: 'could not retrieve assets from storage: ' + this.name });
        }

        const folders = apiResponse.prefixes.map(prefix => ({
          metadata: {
            name: prefix,
            kind: ASSET_TYPES.DIRECTORY
          }
        }));

        filesAndFolders.push(...folders, ...files);

        if (!!next) {
          this.bucket.getFiles(next, cb);
        } else {
          resolve(filesAndFolders);
        }
      };

      this.bucket
        .getFiles({
          prefix: path.slice(1),
          delimiter: '/',
          autoPaginate: false
        }, cb);

    });
  }

  /**
   *
   * @param fullPath
   * @param file {Buffer}
   * @returns {Promise<void>}
   */
  async upload(fullPath, file) {
    try {
      const remoteWriteStream = this.bucket.file(fullPath.slice(1)).createWriteStream();
      await new Promise((resolve, reject) => {
        remoteWriteStream
          .on('error', reject)
          .on('finish', resolve)
          .write(file);
        remoteWriteStream.end();
      });
    } catch (error) {
      throw { message: 'could not upload asset to storage: ' + this.name };
    }
  }

  async remove(file) {
    try {
      await this.bucket.file(file.slice(1)).delete();
    } catch (error) {
      throw { message: 'could not remove asset from storage: ' + file };
    }
  }

  async rename(oldFile, newFile) {
    try {
      await this.bucket.file(oldFile.slice(1)).rename(newFile.slice(1));
    } catch (error) {
      throw { message: 'could not rename asset from storage: ' + oldFile };
    }
  }

  async destroy() {
    try {
      // await this.bucket.???
    } catch (error) {
      throw { message: 'could not remove bucket from storage: ' + this.name };
    }
  }
}

module.exports = Gcs;
