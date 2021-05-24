const { redisUrl } = require('../../config')

const cacheManager = require('cache-manager').caching({
  store: redisUrl ? require('cache-manager-redis') : 'memory',
  url: redisUrl,
  ttl: 600,
})

module.exports = cacheManager
