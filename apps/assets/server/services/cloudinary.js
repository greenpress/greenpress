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


/*
* For now returning the minimum 10 assets until instructed otherwise.
* */
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
    publicUrl: asset.secure_url
    /*updated: ???, cloudinary does not provide updated data but it doest provide a created_at iso string */
  }));
}

async function uploadFile(storage, { identifier, file, extension, prefix }) {
  const cloudinary = new Cloudinary(storage);
  const filename = generateIdentifier(prefix, extension);
  const folder = path.join(storage.metadata.basePath, identifier);
  const parser = new DatauriParser();
  const { content } = parser.format(filename, file);

  const options = Object.assign({
    public_id: prefix
  }, {
    ...(folder !== '/' && { folder: folder })
  });

  let asset;
  try {
    await cloudinary.ready;
    asset = await cloudinary.upload(content, options);
  } catch (e) {
    throw new Error(e.message || 'failed to upload asset to: ' + path.join(storage.metadata.basePath || '/', identifier, filename));
  }

  return { success: true, publicUrl: asset.secure_url };

}

module.exports = {
  loadFiles,
  uploadFile
};