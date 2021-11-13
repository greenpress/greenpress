const Block = require("../models/block");

function getBlocksList(req, res) {
  const reqQuery = { ...req.query || {} };

  const query = {
    tenant: req.headers.tenant,
  };

  const limit = parseInt(reqQuery.limit) || 30;
  const offset = parseInt(reqQuery.offset) || 0;

  Block.search(query, { limit, offset })
    .then((data) => {
      if (!data) {
        return Promise.reject(null);
      }
      res.status(200).json(data).end();
    })
    .catch(() => {
      res.status(400).json({ message: "failed to load blocks list" }).end()
    });
}

// IMPORTANT: feature before update and delete handler functions
function getBlockById(req, res, next) {
  const { blockId } = req.params || {};
  const { tenant } = req.headers || {};
  const useCache = !req.user?.isEditor;
  Block.getSingleBlock({ blockId, tenant, useCache }).then((block) => {
    if (!block) {
      return Promise.reject(null);
    }
    req.block = block;
    next();
  }).catch(() => {
    res.status(404).json({ message: "block not exists" }).end()
  });
}

function singleBlock(req, res) {
  res.status(200).json(req.block).end();
}

// create a block. accept all types
function createBlock(req, res) {
  const { name, description, content, contentType } = req.body || {};
  const { tenant } = req.headers;
  const newBlock = new Block(
    { name, description, contentType, content, tenant },
  );
  newBlock.save().then((block) => {
    if (!block) {
      return Promise.reject(null);
    }
    block = block.toObject();
    res.status(200).json(block).end();
  }).catch(() =>
    res.status(500).json(
      { message: "error while creating block, try again" },
    ).end()
  );
}

function updateBlock(req, res) {
  const { block: currBlock, body } = req;
  delete body.tenant;

  Object.assign(currBlock, body).save()
    .then((newBlock) => {
      res.status(200).json(newBlock).end();
    })
    .catch(() =>
      res.status(500).json(
        { message: "error while updating block, try again" },
      ).end()
    );
}

function deleteBlock(req, res) {
  const { block: deletedBlock } = req;

  deletedBlock.remove()
    .then((block) => {
      res.status(200).json(block).end();
    })
    .catch(() =>
      res.status(500).json(
        { message: "error while deleting block, try again" },
      ).end()
    );
}

module.exports = {
  getBlocksList,
  getBlockById,
  singleBlock,
  createBlock,
  updateBlock,
  deleteBlock,
};
