import { ICache } from "./cache-type";
import { promisify } from "util";
import { createClient } from 'redis';
import { CacheManagerOptions } from "./cache-manager-options";

export function createRedisCache(redisUrl: string): ICache {
    const client = createClient(redisUrl);
    client.on("connect", function() {
        console.log('redis is connected for cache manager');
    });
    client.on("error", function(error) {
        console.warn("failed to connect to redis server");
    });

    const getItem = promisify(client.get).bind(client);
    const setItem = promisify(client.set).bind(client);

    return {
        getItem,
        async setItem (key: string, value: string, ttl: number): Promise<void> {
            await setItem(key, value);
            if (ttl) {
                client.expire(key, ttl);
            }
        }
    };
}
