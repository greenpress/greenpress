const mongoose = require('mongoose')
const cacheManager = require('../utils/cache-manager')

const cachePrefix = 'menu:'

const categoryPopulation = {
  path: 'links.category',
  select: 'path name _id'
}
const linkPopulation = {
  path: 'links.post',
  select: 'path category _id title',
  populate: {
    path: 'category',
    select: 'path _id'
  }
}

// define the model schema
const MenuSchema = new mongoose.Schema({
  tenant: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  links: [{
    kind: {
      type: String,
      enum: ['category', 'post', 'http'],
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    value: { text: String, url: String, newWindow: Boolean },
  }],
})

MenuSchema.index({ tenant: 1, name: 1 }, { unique: true })

MenuSchema.query.enrichment = function () {
  return this.populate(categoryPopulation).populate(linkPopulation)
}

MenuSchema.methods.storeInCache = function () {
  return cacheManager.setItem(`${cachePrefix}single:${this.name}.${this.tenant}`, JSON.stringify(this.toObject()))
}

MenuSchema.methods.clearInCache = function () {
  return cacheManager.setItem(`${cachePrefix}single:${this.name}.${this.tenant}`, '')
}

MenuSchema.statics.getSingleMenu = function getSingleMenu({ tenant, name, useCache = true }) {
  if (useCache) {
    return cacheManager.wrap(
      `${cachePrefix}single:${name}.${tenant}`,
      () => this.findOne({ name, tenant })
        .populate(categoryPopulation)
        .populate(linkPopulation)
        .lean()
        .exec()
        .then(JSON.stringify)
    );
  }
  return this.findOne({ name, tenant }).lean().exec().then(JSON.stringify);
}

module.exports = mongoose.model('Menu', MenuSchema)
