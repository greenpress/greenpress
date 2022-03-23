import { CacheManagerOptions } from "./cache-manager-options";
import { ICache } from "./cache-type";

export type IDataProviderCallback = () => string | Promise<string>;

export interface CacheManager {
    getItem: (key: string) => Promise<string>;
    setItem: (key: string, value: string, ttl:number) => Promise<void>;
    wrap: (key: string, fallback: IDataProviderCallback) => Promise<string>;
}

export function createCacheManager(cacher: ICache, { ttl }: CacheManagerOptions = { ttl: 600 }): CacheManager {

    return {
        getItem: cacher.getItem,
        setItem(key: string, value: string, itemTtl :number =ttl) {
            return cacher.setItem(key, value, itemTtl);
        },
        async wrap(key: string, fallback: IDataProviderCallback) {
            let currentValue;
            try {
                currentValue = await cacher.getItem(key);
            } catch {
                //
            }
            if (currentValue) {
                return currentValue;
            }
            try {
                currentValue = await fallback();

                // doing it in background
                setImmediate(() => {
                    cacher.setItem(key, currentValue, ttl).catch(() => console.warn('could not set value on cache provider', key));
                });
            } catch {

            }
            return currentValue;
        }
    }
}
