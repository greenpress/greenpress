import {internalServicesSecret, secretsToken} from '../../config';
import {service} from '@greenpress/api-kit';
import {cacheManager} from './cache-manager';
import {fetchPlugin} from './plugins-call';

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
    .then((axiosRes: any) => {
      return axiosRes.data;
    })
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

  const res = fetchPlugin({
    url: authAcquire.refreshTokenUrl,
    method: 'POST',
    tenant,
    accessToken: refreshToken,
  })
  const body = await res.json();

  const accessToken = storeOAuthPayloadForPlugin(tenant, apiPath, body, authAcquire);
  return accessToken;
}

export function getPluginAccessToken(tenant: string, apiPath: string) {
  return cacheManager.getItem(`plugins:${tenant}-${apiPath}:access-token`).catch(() => null)
}

export async function getPluginToken(plugin: { tenant: string, apiPath: string, authAcquire?, token? }): Promise<string> {
  return (await getPluginAccessToken(plugin.tenant, plugin.apiPath).catch(() => null)) ||
    (await refreshTokenForPlugin(plugin.tenant, plugin.apiPath, plugin.authAcquire).catch(() => null)) ||
    plugin.token
}


