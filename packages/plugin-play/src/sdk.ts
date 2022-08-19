import {fetch as undiciFetch} from 'undici';
import GreenpressAdministratorSDK from '@greenpress/sdk/dist/administrator';
import {FetchLike} from '@greenpress/sdk/dist/types';
import config from './config';
import {BasicPayload} from '@greenpress/sdk/dist/authentication';

let localSdk: GreenpressAdministratorSDK<{ tokenIdentifier: string }>;
let localSdkAuth: { payload: BasicPayload & { token: string, refreshToken: string } };

function authenticate() {
  localSdk.authentication.oAuthSignin({email: config.greenpressUsername, password: config.greenpressPassword})
    .then(auth => localSdkAuth = auth)
    .catch(() => {
      console.log('could not authenticate to own greenpress app');
      process.exit(1);
    })
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
