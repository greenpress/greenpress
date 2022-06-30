const shortid = require('shortid')
const mongoose = require('mongoose')
const cacheManager = require('../utils/cache-manager')

const cachePrefix = 'posts:'

// define the model schema
const PostSchema = new mongoose.Schema({
  tenant: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    default: () => shortid.generate(),
    required: true,
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  isPublic: {
	  type: Boolean,
	  default: true
  },
  isPinned: {
	type: Boolean,
	default: false
  },
  authors: [String],
  title: {
    type: String,
    required: true,
  },
  short: String,
  thumbnail: String,
  contents: [String],
  editorContentsStates: [{
    type: String,
    enum: ['html', 'editor', 'view']
  }],
  tags: [{
    type: String,
    index: true,
  }],
  created: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updated: {
    type: Date,
    default: Date.now,
  }
})

PostSchema.index({ tenant: 1, path: 1, category: 1 }, { unique: true })

PostSchema.pre('save', function (next) {
  this.updated = new Date()
  if (!this.isModified('path')) return next()

  return this.constructor.findOne({ path: this.path, category: this.category, tenant: this.tenant })
    .select('_id')
    .lean()
    .then(item => {
      if (item) {
        next({ message: 'path already exists at category' })
      }
      next()
    })
    .catch(next)
})

PostSchema.statics.search = function search (query, freeTextSearch, select, { limit, offset, categoriesFields }, useCache = false) {

  const stringedSearch = freeTextSearch ? `${freeTextSearch.text}~${freeTextSearch.basic}` : 'NO_TEXT_SEARCH'
  const stringedQuery = Object.keys(query).map(key => `${key}=${query[key]}`)

  if (freeTextSearch) {
    const reg = new RegExp(freeTextSearch.text, 'i')
    if (freeTextSearch.basic) {
      query.title = reg
    } else {
      query.$or = [
        { title: reg },
        { short: reg },
      ]
      if (freeTextSearch.text > 10) {
        query.$or.push({ contents: reg })
      }
    }
  }

  const makeSearch = () => {
    return this.find(query)
      .select(select)
      .sort({ created: -1 })
      .populate('category', categoriesFields || 'path')
      .limit(limit)
      .skip(offset)
      .lean()
      .exec()
      .then(list => {
        if (list && list.length) {
          if (!categoriesFields) {
            list = list.map(post => {
              post.category = post.category.path
              return post
            })
          }
          return JSON.stringify(list)
        }
        return '[]'
      })
  }

  if (useCache) {
    return cacheManager.wrap(`${cachePrefix}search:${stringedQuery}.${stringedSearch}.${select}.${limit}.${offset}.${categoriesFields}`, makeSearch, { ttl: 60 })
  } else {
    return makeSearch()
  }
}

module.exports = mongoose.model('Post', PostSchema)
