import {internalServicesSecret, secretsToken} from '../../config';
import {service} from '@greenpress/api-kit';
import {cacheManager} from './cache-manager';

const secretsService = service('SECRETS', {port: process.env.SECRETS_SERVICE_PORT || 9002});

function callSecretsService(url: string, tenant: string, key: string, value?: any) {
  return secretsService({
    headers: {internal_secret: internalServicesSecret, tenant},
    method: 'POST',
    data: {
      key,
      value,
      token: secretsToken
    },
    url
  })
    .then((axiosRes: any) => axiosRes.data)
}

export function getRefreshSecret(tenant: string, apiPath: string): Promise<{ value: string }> {
  return callSecretsService('/api/secrets/get', tenant, `refresh-token-${tenant}-${apiPath}`)
}

export function setRefreshSecret(tenant: string, apiPath: string, refreshToken: string) {
  return callSecretsService('/api/secrets/set', tenant, `refresh-token-${tenant}-${apiPath}`, refreshToken)
}

export function storeOAuthPayloadForPlugin(tenant: string, apiPath: string, payload, authAcquire) {
  const newRefreshToken = payload[authAcquire.refreshTokenKey];
  const accessToken = payload[authAcquire.accessTokenKey];

  setRefreshSecret(tenant, apiPath, newRefreshToken).catch();
  cacheManager.setItem(`plugins:${tenant}-${apiPath}:access-token`, accessToken, {ttl: 60000}).catch()

  return accessToken;
}


export async function refreshTokenForPlugin(tenant: string, apiPath: string, authAcquire): Promise<string> {
  const refreshToken = (await getRefreshSecret(tenant, apiPath)).value;

  const res = await fetch(authAcquire.refreshTokenUrl, {
    method: 'POST',
    headers: {
      'x-tenant': tenant,
      'x-from': 'greenpress',
      'Authorization': 'Bearer ' + refreshToken,
      'Content-Type': 'application/json',
    }
  })
  const body = await res.json();

  const accessToken = storeOAuthPayloadForPlugin(tenant, apiPath, body, authAcquire);
  return accessToken;
}

export function getPluginAccessToken(tenant: string, apiPath: string) {
  return cacheManager.getItem(`plugins:${tenant}-${apiPath}:access-token`).catch(() => null)
}
