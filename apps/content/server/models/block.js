const shortId = require("shortid");
const mongoose = require("mongoose");
const cacheManager = require("../utils/cache-manager");

const cachePrefix = "block:";

const BlockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tenant: {
    type: String,
    required: true,
  },
  description: { // editors only in controller!
    type: String,
  },
  content: String,
  contentType: { // editors only in controller!
    type: String,
    enum: [
      "content",
      "html",
    ],
  },
});

BlockSchema.index({ tenant: 1, _id: 1 }, { unique: true });

// some useful methods

BlockSchema.statics.search = function search(query = {}, { limit, offset }) {
  let dbRequest = this.find(query).lean();
  if (limit) {
    dbRequest = dbRequest.limit(limit);
  }
  if (offset) {
    dbRequest = dbRequest.offset(offset);
  }
  return dbRequest;
};

BlockSchema.statics.getSingleBlock = function getSingleBlock({ blockId, tenant, useCache = true }) {
  const q = () => this.findOne({ _id: blockId, tenant: tenant });

  if (useCache) {
    return cacheManager.wrap(`${cachePrefix}single:${blockId}.${tenant}`, q);
  } else {
    return q();
  }
}

module.exports = mongoose.model("Block", BlockSchema);
