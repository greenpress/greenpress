const Cloudinary = require("../models/cloudinary");
const path = require("path");
const ASSET_TYPES = require('../../helpers/asset-types.json');

const cloudinaryAssetTypeToGreenpressAssetType = (assetType) => ({
  raw: ASSET_TYPES.ASSET,
  image: ASSET_TYPES.IMAGE,
  video: ASSET_TYPES.ASSET,
})[assetType]

async function loadFiles(storage, identifier = '/') {
  const cloudinary = new Cloudinary(storage);
  const fullPath = path.join(storage.metadata.basePath || '/', identifier);

  let list;
  try {
    await cloudinary.ready;
    ({ resources: list } = await cloudinary.list());
  } catch (e) {
    throw new Error(e.message || 'failed to get list of assets from: ' + fullPath);
  }

  return list.map((asset) => ({
    name: asset.public_id,
    identifier: path.join(identifier, asset.public_id),
    type: cloudinaryAssetTypeToGreenpressAssetType(asset.resource_type),
    publicUrl: asset.secure_url
    /*updated: ???, cloudinary does not provide updated data but it doest provide a created_at iso string */
  }));
}

module.exports = {
  loadFiles,
};