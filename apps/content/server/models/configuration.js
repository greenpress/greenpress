const mongoose = require('mongoose')
const cacheManager = require('../utils/cache-manager')

const cachePrefix = 'configuration:'

// define the model schema
const Configuration = new mongoose.Schema({
	tenant: {
		type: String,
		required: true,
	},
	// configuration name
	key: {
		type: String,
		required: true,
	},
	// is public to see - like site configuration, or not public, like services versions..
	public: {
		type: Boolean,
		default: () => true,
	},
	description: String,
	// the internal configuration object - can be whatever you want.
	metadata: mongoose.SchemaTypes.Mixed,
	created: {
		type: Date,
		default: Date.now
	}
}, { collection: 'configurations' })

Configuration.index({ tenant: 1, key: 1 }, { unique: true })

Configuration.statics.getByKey = function getByKey(tenant, key, isAdmin) {
	if (isAdmin) {
		return this.findOne({ key, tenant }).then(config => {
			if (config.public) {
				cacheManager.setItem(cachePrefix + tenant + ':' + key, JSON.stringify({
					tenant,
					key,
					metadata: config.metadata
				}))
			}
			return config
		})
	}
	return cacheManager.wrap(cachePrefix + tenant + ':' + key, () => {
		return this.findOne({ key, public: true })
			.select('tenant key metadata')
			.lean()
			.then(config => {
				return JSON.stringify({ tenant, key, metadata: config.metadata })
			})
	})
}

Configuration.post('save', function () {
	cacheManager.setItem(cachePrefix + this.tenant + ':' + this.key, '', { ttl: 1 })
})

module.exports = mongoose.model('Configuration', Configuration)
