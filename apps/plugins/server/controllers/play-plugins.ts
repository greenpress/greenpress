import fetch from 'node-fetch';
import Plugin, {IPlugin} from '../models/plugin';
import {cacheManager} from '../services/cache-manager';
import {getRefreshSecret, setRefreshSecret} from '../services/tokens-management';

async function refreshTokenForPlugin(tenant: string, apiPath: string, authAcquire): Promise<string> {
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

  const newRefreshToken = body[authAcquire.refreshTokenKey];
  const accessToken = body[authAcquire.accessTokenKey];

  setRefreshSecret(tenant, apiPath, newRefreshToken).catch();
  cacheManager.setItem(`plugins:${tenant}-${apiPath}:access-token`, accessToken, { ttl: 60000 }).catch()

  return accessToken;
}

export async function getPluginProxy({tenant, apiPath}): Promise<Pick<IPlugin, 'token' | 'proxyUrl'> | null> {
  const [plugin, token] = await Promise.all([
    Plugin.findOne({tenant, apiPath}).select('token proxyUrl authAcquire').lean(),
    cacheManager.getItem(`plugins:${tenant}-${apiPath}:access-token`)
  ])

  if (!plugin) {
    return null;
  }

  let accessToken = token || plugin.token;

  if (!accessToken) {
    accessToken = await refreshTokenForPlugin(tenant, apiPath, plugin.authAcquire);
  }

  return {token: accessToken, proxyUrl: plugin.proxyUrl};
}
