const ftpService = require('../services/ftp');
const gcsService = require('../services/gcs');
const s3Service = require('../services/s3');
const cloudinaryService = require('../services/cloudinary');

const getService = ({ kind }) => ({
  gcs: gcsService,
  ftp: ftpService,
  s3: s3Service,
  cloudinary: cloudinaryService
})[kind];

function getStorageAssets(req, res) {
  const identifier = req.query.identifier;
  const service = getService(req.storage);

  if (!service) {
    return res.end();
  }
  service.loadFiles(req.storage, identifier)
    .then(list => res.json(list).end())
    .catch(() => {
      res.status(500).json({ message: 'could not get assets' }).end();
    });
}

function uploadStorageAssets(req, res) {
  const file = req.files[0].buffer;
  const type = req.files[0].mimetype;
  const { identifier, extension, prefix } = req.query || {};
  const service = getService(req.storage);

  if (!service) {
    return res.end();
  }

  service.uploadFile(req.storage, { identifier, file, extension, prefix, type })
    .then((result) => res.status(200).json(result).end())
    .catch((error) => {
      res.status(500).json({ message: error.message || 'could not upload asset' }).end();
    });
}

function removeStorageAsset(req, res) {
  const identifier = req.query.identifier;
  const service = getService(req.storage);

  if (!service) {
    return res.end();
  }
  service.removeFile(req.storage, identifier, req.body.file)
    .then(() => res.end())
    .catch(() => res.status(500).json({ message: 'could not remove asset' }).end());
}

function renameStorageAssets(req, res) {
  const identifier = req.query.identifier;
  const newFilename = req.body.newFilename;
  const service = getService(req.storage);

  if (!service) {
    return res.end();
  }

  service.renameFile(req.storage, identifier, newFilename)
    .then(() => res.end())
    .catch(() => res.status(500).json({ message: 'could not rename asset' }).end());
}

function verifyIdentifier(req, res, next) {
  if (!req.query.identifier) {
    return res
      .status(500)
      .json({ message: 'Must supply asset identifier' })
      .end();
  }
  next();
}

module.exports = { getStorageAssets, removeStorageAsset, verifyIdentifier, uploadStorageAssets, renameStorageAssets };
