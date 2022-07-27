import Plugin, {IPlugin} from '../models/plugin';
import {getPluginAccessToken, refreshTokenForPlugin,} from '../services/tokens-management';

export async function getPluginProxy({tenant, apiPath}): Promise<Pick<IPlugin, 'token' | 'proxyUrl'> | null> {
  const [plugin, token] = await Promise.all([
    Plugin.findOne({tenant, apiPath}).select('token proxyUrl authAcquire').lean(),
    getPluginAccessToken(tenant, apiPath)
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
