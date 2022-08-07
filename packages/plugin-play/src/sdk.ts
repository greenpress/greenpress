import {fetch as undiciFetch} from 'undici';
import GreenpressSDK from '@greenpress/sdk';
import { FetchLike } from '@greenpress/sdk/dist/types';

export function getSdk(appUrl: string): GreenpressSDK {
  return new GreenpressSDK({appUrl, fetch: globalThis.fetch || undiciFetch as any as FetchLike});
}

export function verifyWebsite(url: string, email: string) {
  return false;
}
