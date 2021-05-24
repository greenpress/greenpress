const shortid = require('shortid')
const mongoose = require('mongoose')
const cacheManager = require('../utils/cache-manager')

const cachePrefix = 'categories:'

// define the model schema
const CategorySchema = new mongoose.Schema({
	tenant: {
		type: String,
		required: true
	},
	name: String,
	content: String,
	path: {
		type: String,
		default: () => shortid.generate(),
		required: true
	},
	isPublic: Boolean,
	created: {
		type: Date,
		default: Date.now
	}
}, { collection: 'categories' })

CategorySchema.index({ tenant: 1, path: 1 }, { unique: true })

CategorySchema.pre('save', function(next) {
	if (!this.isModified('path')) return next()

	return this.constructor.findOne({ path: this.path, tenant: this.tenant })
		.select('_id')
		.lean()
		.then(item => {
			if (item) {
				next({ message: 'path already exists' })
			}
			next()
		})
		.catch(next)
})

CategorySchema.statics.getCategoryIdByPath = function getCategoryIdByPath (tenant, path) {
	return cacheManager.wrap(`${cachePrefix}:IdByPath:${tenant}:${path}`, () => this.findOne({ tenant, path })
		.select('_id')
		.lean()
		.then(cat => cat ? cat._id : null))
}

module.exports = mongoose.model('Category', CategorySchema)
