import { CacheManagerOptions } from "./cache-manager-options";
import { ICache } from "./cache-type";

export function createMemoryCache(): ICache {
    const storage = new Map();
    const keysToRemove = new Map();

    const getItem = (key: string) => {
        return Promise.resolve(storage.get(key));
    }

    const setItem = (key: string, value: string, { ttl }: CacheManagerOptions) => {
        storage.set(key, value);
        if (ttl) {
            keysToRemove.set(key, Date.now() + (ttl * 1000));
        }
        return Promise.resolve();
    }

    setInterval(() => {
        const now = Date.now();
        keysToRemove.forEach((timeToRemove, key) => {
            if (now > timeToRemove) {
                keysToRemove.delete(key);
                storage.delete(key);
            }
        });
    }, 5000);

    return { getItem, setItem };
}
