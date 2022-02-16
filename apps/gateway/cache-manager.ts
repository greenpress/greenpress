import { createCacheManager } from "@greenpress/cache-manager";

const redisUrl = process.env.REDIS_URL;
const cacher = redisUrl
  ? require("@greenpress/cache-manager/dist/redis-cache").createRedisCache(
      redisUrl
    )
  : require("@greenpress/cache-manager/dist/memory-cache").createMemoryCache();

const cacheManager = createCacheManager(cacher);

export default cacheManager;
