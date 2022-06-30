import { CacheManagerOptions } from "./cache-manager-options";
import { ICache } from "./cache-type";

export type IDataProviderCallback = () => string | Promise<string>;

export interface CacheManager {
    getItem: (key: string) => Promise<string>;
    setItem: (key: string, value: string, { ttl }?: CacheManagerOptions) => Promise<void>;
    wrap: (key: string, fallback: IDataProviderCallback, setterOptions?: Partial<CacheManagerOptions>) => Promise<string>;
}

export function createCacheManager(cacher: ICache, applicationOptions: CacheManagerOptions = { ttl: 6000 }): CacheManager {

    return {
        getItem: cacher.getItem,
        setItem(key: string, value: string, options: Partial<CacheManagerOptions> = {}) {
            return cacher.setItem(key, value, { ...applicationOptions, ...options });
        },
        async wrap(key: string, fallback: IDataProviderCallback, setterOptions: Partial<CacheManagerOptions> = {}) {
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
                    cacher.setItem(key, currentValue, { ...applicationOptions, ...setterOptions }).catch(() => console.warn('could not set value on cache provider', key));
                });
            } catch {

            }
            return currentValue;
        }
    }
}
