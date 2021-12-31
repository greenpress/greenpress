const Cloudinary = require("../models/cloudinary");
const path = require("path");
const ASSET_TYPES = require('../../helpers/asset-types.json');
const { generateIdentifier } = require("./identifier");
const DatauriParser = require('datauri/parser');

const cloudinaryAssetTypeToGreenpressAssetType = (assetType) => ({
  raw: ASSET_TYPES.ASSET,
  image: ASSET_TYPES.IMAGE,
  video: ASSET_TYPES.ASSET,
})[assetType]


async function loadFiles(storage, identifier = '/') {
  const cloudinary = new Cloudinary(storage);
  const fullPath = path.join(storage.metadata.basePath || '/', identifier);
  let resources;
  try {
    await cloudinary.ready;
    ({ resources } = await cloudinary.list(fullPath));
  } catch (e) {
    throw new Error(e.message || 'failed to get list of assets from: ' + fullPath);
  }

  return resources.map((asset) => ({
    name: asset.public_id,
    identifier: path.join(identifier, asset.public_id),
    type: cloudinaryAssetTypeToGreenpressAssetType(asset.resource_type),
    publicUrl: asset.secure_url,
    updated: asset.created_at,
  }));
}

async function uploadFile(storage, { identifier, file, extension, prefix }) {
  const cloudinary = new Cloudinary(storage);
  const filename = generateIdentifier(prefix, extension);
  const folder = path.join(storage.metadata.basePath, identifier);
  const parser = new DatauriParser();
  const { content } = parser.format(filename, file);

  const options = {
    public_id: prefix,
    ...(folder !== '/' && { folder })
  };

  let asset;
  try {
    await cloudinary.ready;
    asset = await cloudinary.upload(content, options);
  } catch (e) {
    throw new Error(e.message || 'failed to upload asset to: ' + path.join(storage.metadata.basePath || '/', identifier, filename));
  }

  return { success: true, publicUrl: asset.secure_url };
}

async function removeFile(storage, identifier) {
  const cloudinary = new Cloudinary(storage);
  const fullPath = path.join(storage.metadata.basePath || '/', identifier);

  try {
    await cloudinary.ready;
    await cloudinary.remove(identifier);
  } catch (e) {
    throw new Error(e.message || 'failed to remove asset: ' + fullPath);
  }

  return { success: true };
}

async function renameFile(storage, oldIdentifier, newFileName) {
  const cloudinary = new Cloudinary(storage);
  const fullPath = path.join(storage.metadata.basePath || '/', oldIdentifier);

  try {
    await cloudinary.ready;
    await cloudinary.rename(oldIdentifier, newFileName);
  } catch (e) {
    throw new Error(e.message || 'failed to remove asset: ' + fullPath);
  }

  return { success: true };
}

module.exports = {
  loadFiles,
  uploadFile,
  removeFile,
  renameFile
};