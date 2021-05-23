const AWS = require('aws-sdk');
const { getSecret } = require('../../helpers/secrets-management');
const ASSET_TYPES = require('../../helpers/asset-types.json');

AWS.config.setPromisesDependency();

class S3 {
  constructor(storage) {
    this.name = storage.name;
    this.ready = getSecret(storage.tenant, storage.authentication).then(
      (decrypted) => {
        const { accessKeyId, secretAccessKey } = decrypted.value;

        this._client = new AWS.S3({
          accessKeyId,
          secretAccessKey
        });
        this.bucket = { name: storage.metadata.bucketName };

      },
      () => {
        throw new Error('could not read AWS credentials');
      }
    );
  }

  async list(path) {
    try {

      const listedObjects = await this._client
        .listObjectsV2({
          Bucket: this.bucket.name,
          Prefix: path.slice(1),
          Delimiter: "/"
        })
        .promise();

      const files = listedObjects.Contents.map(content => ({
        ...content,
        metadata: {
          name: content.Key,
        }
      }));

      const folders = listedObjects.CommonPrefixes.map(({ Prefix }) => ({
        metadata: {
          name: Prefix,
          kind: ASSET_TYPES.DIRECTORY
        }
      }));

      return [...folders, ...files];

    } catch (error) {
      throw { message: 'could not retrieve assets from storage: ' + this.name };
    }
  }

  async upload(fullPath, file) {
    try {
      this._client
        .upload({
          Bucket: this.bucket.name,
          Key: fullPath.slice(1),
          Body: file.buffer,
          ContentType: file.type
        })
        .promise();

    } catch (error) {
      throw { message: 'could not upload asset to storage: ' + this.name };
    }
  }

  async remove(file) {
    try {
      const params = {
        Bucket: this.bucket.name,
        Prefix: file.slice(1),
        Delimiter: "/"
      };

      const listedObjects = await this._client.listObjectsV2(params).promise();

      if (listedObjects.Contents.length === 0) return;

      const deleteParams = {
        Bucket: this.bucket.name,
        Delete: { Objects: listedObjects.Contents.map(({ Key }) => ({ Key })) }
      };

      await this._client.deleteObjects(deleteParams).promise();

      if (listedObjects.IsTruncated) await this.remove(file);

    } catch (error) {
      throw { message: 'could not remove asset from storage: ' + file };
    }
  }

  async rename(oldFullPath, newFullPath) {

    try {

      const params = {
        Bucket: this.bucket.name,
        CopySource: encodeURIComponent(`/${this.bucket.name}${oldFullPath}`),
        Key: newFullPath.slice(1),
      };

      await this._client
        .copyObject(params)
        .promise();

      await this.remove(oldFullPath);

    } catch (e) {
      throw { message: 'could not name asset: ' + oldFullPath };
    }

  }
}

module.exports = S3;
