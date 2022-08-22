import {fetch as undiciFetch} from 'undici';
import GreenpressAdministratorSDK from '@greenpress/sdk/dist/administrator';
import {FetchLike} from '@greenpress/sdk/dist/types';
import config from './config';

let localSdk: GreenpressAdministratorSDK<{ tokenIdentifier: string }>;

async function authenticate() {
  try {
    await localSdk.authentication.oAuthSignin({email: config.greenpressUsername, password: config.greenpressPassword});
    console.log('authenticated successfully to ' + config.greenpressUrl)
  } catch (err) {
    console.log('could not authenticate to own greenpress app');
    process.exit(1);
  }
}

export function getSdkForUrl<T = any>(appUrl: string): GreenpressAdministratorSDK {
  return new GreenpressAdministratorSDK<T>({appUrl, fetch: globalThis.fetch || undiciFetch as any as FetchLike});
}

export function getSdk() {
  if (localSdk) {
    return localSdk;
  }
  localSdk = getSdkForUrl<{ tokenIdentifier: string }>(config.greenpressUrl);
  authenticate();
  return localSdk;
}

export function verifyWebsite(url: string, email: string) {
  return false;
}
