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
  description: { //editors only in controller!
    type: String,
  },
  contents: [],
  contentType: {
    type: String,
    enum: [
      "content", // for regular blocks
      "images", // for a gallery of images
      "script", // for ads
    ],
  },
});

// some useful methods

BlockSchema.statics.Search = function Search(
  query = {},
  { limit, offset },
) {
  return this.find(query)
    .limit(limit)
    .offset(offset)
    .then((list) => {
      if (list && list.length) return JSON.stringify(list);
      else return "[]";
    });
};

BlockSchema.statics.SingleBlock = function SingleBlock(
  blockId,
  tenant,
  useCache = false,
) {
  const cacheString = `${cachePrefix}single:${blockId}.${tenant}`;

  const q = () => this.findOne({ _id: blockId, tenant: tenant });

  if (useCache) {
    return cacheManager.wrap(cacheString, q);
  } else {
    return q();
  }
};

module.exports = mongoose.model("Block", BlockSchema);
