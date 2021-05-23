const S3 = require('../models/s3');
const uniqid = require('uniqid');
const path = require('path');
const { generateIdentifier } = require('./identifier');
const { getAssetType } = require('./get-asset-type');
const { joinUrl } = require('./url');

async function uploadFile(storage, { identifier, file, extension, prefix, type }) {
  const s3 = new S3(storage);
  const filename = `${prefix}-${uniqid()}.${extension}`;
  const fullPath = path.join(storage.metadata.basePath || '/', identifier, filename);

  try {
    await s3.ready;
    await s3.upload(fullPath, { buffer: file, type });
  } catch (e) {
    throw new Error(e.message || 'failed to upload asset to: ' + fullPath);
  }

  return { success: true, publicUrl: joinUrl(storage.metadata.publicUrl, path.join(identifier, filename)) };
}

async function loadFiles(storage, identifier = '/') {

  const s3 = new S3(storage);
  const fullPath = path.join(storage.metadata.basePath || '/', identifier);

  let list;
  try {
    await s3.ready;
    list = await s3.list(fullPath);
  } catch (e) {
    throw new Error(e.message || 'failed to get list of assets from: ' + fullPath);
  }

  return list.map((asset) => {
    const fileIdentifier = path.join(identifier, asset.metadata.name);

    return {
      name: asset.metadata.name,
      identifier: fileIdentifier,
      updated: asset.LastModified,
      type: getAssetType(asset.metadata),
      publicUrl: joinUrl(storage.metadata.publicUrl, fileIdentifier)
    };
  });
}

async function removeFile(storage, identifier) {
  const s3 = new S3(storage);
  const fullPath = path.join(storage.metadata.basePath || '/', identifier);

  try {
    await s3.ready;
    await s3.remove(fullPath);
  } catch (e) {
    throw new Error(e.message || 'failed to remove asset: ' + fullPath);
  }

  return { success: true };
}

async function renameFile(storage, oldIdentifier, newFileName) {
  const s3 = new S3(storage);
  const extension = oldIdentifier.split('.').pop();
  const newIdentifier = generateIdentifier(newFileName, extension);
  const oldFullPath = path.join(storage.metadata.basePath || '/', oldIdentifier);
  const newFullPath = path.join(storage.metadata.basePath || '/', newIdentifier);

  try {
    await s3.ready;
    await s3.rename(oldFullPath, newFullPath);
  } catch (e) {
    throw new Error(e.message || 'failed to rename asset: ' + oldFullPath);
  }

  return { success: true };
}

module.exports = {
  uploadFile,
  loadFiles,
  removeFile,
  renameFile
};
