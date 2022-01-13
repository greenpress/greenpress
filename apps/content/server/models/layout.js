const mongoose = require("mongoose");
const cacheManager = require("../utils/cache-manager");
const Menu = require('./menu');

const cachePrefix = "layout:";

const LayoutContentSchema = new mongoose.Schema({
  component: {
    type: String,
    required: true,
  },
  predefined: Boolean,
  classes: String,
  props: mongoose.Schema.Types.Mixed,
});
LayoutContentSchema.add({
  children: [LayoutContentSchema]
})

const LayoutSchema = new mongoose.Schema({
  kind: {
    type: String,
    enum: ['index', 'search', 'tag', 'category', 'post'],
    required: true,
    index: true,
  },
  tenant: {
    type: String,
    required: true,
  },
  connectedData: [
    {
      kind: {
        type: String,
        enum: ['block', 'menu', 'http']
      },
      identifier: String,
      reference: String
    }
  ],
  content: [LayoutContentSchema]
});

LayoutSchema.index({ tenant: 1, kind: 1 }, { unique: true });

// some useful methods
LayoutSchema.statics.search = function search(query = {}) {
  return this.find(query).lean();
};

LayoutSchema.statics.getSingleLayout = function getSingleLayout({ kind, tenant, useCache = true }) {
  if (useCache) {
    return cacheManager.wrap(
      `${cachePrefix}single:${kind}.${tenant}`,
      () => this.findOne({ kind, tenant })
        .select('tenant content connectedData') // must retrieve connectedData and merge with content layout
        .lean()
        .exec()
        .then(async (layout) => {
          await Promise.all(layout.connectedData.map(async (item) => {
            const { kind, identifier } = item;
            let data;
            switch (kind) {
              case 'menu': data = await Menu.getSingleMenu({ name: identifier, tenant });
            }
            item.data = JSON.parse(data);
          }));
          return JSON.stringify(layout);
        })
    );
  }
  return this.findOne({ kind, tenant }).lean().exec().then(JSON.stringify);
}

module.exports = mongoose.model("Layout", LayoutSchema);
