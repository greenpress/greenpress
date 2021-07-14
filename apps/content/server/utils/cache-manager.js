const { redisUrl } = require('../../config')

const { createCacheManager } = require('@greenpress/cache-manager');

const cacher = redisUrl ?
  require('@greenpress/cache-manager/dist/redis-cache').createRedisCache(redisUrl) :
  require('@greenpress/cache-manager/dist/memory-cache').createMemoryCache()

const cacheManager = createCacheManager(cacher);

module.exports = cacheManager;
