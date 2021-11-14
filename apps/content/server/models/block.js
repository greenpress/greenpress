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
    default: 'content',
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
  if (useCache) {
    return cacheManager.wrap(
      `${cachePrefix}single:${blockId}.${tenant}`,
      () => this.findOne({ _id: blockId, tenant })
        .select('content')
        .lean()
        .exec()
        .then(JSON.stringify)
    );
  }
  return this.findOne({ _id: blockId, tenant }).lean().exec().then(JSON.stringify);
}

module.exports = mongoose.model("Block", BlockSchema);
