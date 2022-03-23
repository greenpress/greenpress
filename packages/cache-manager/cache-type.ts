import { CacheManagerOptions } from "./cache-manager-options";

export interface ICache {
    getItem: (key: string) => Promise<string>;
    setItem: (key: string, value: string, ttl:number) => Promise<void>;
}
