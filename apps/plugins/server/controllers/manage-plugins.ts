import Plugin from '../models/plugin';
import {clearPluginAccessToken, getPluginToken, setRefreshSecret} from '../services/tokens-management';
import {enrichPluginWithManifest} from '../services/manifests-service';
import {removeUser} from '../services/users';
import {fetchPlugin} from '../services/plugins-call';

export function getAllPlugins(req, res) {
  Plugin.find({tenant: req.headers.tenant}).select('-token -auth').lean()
    .then(list => {
      res.json(list).end();
    })
    .catch(() => {
      res.status(500).json({message: 'could not get plugins'}).end();
    })
}

async function fetchPluginCallback(req, plugin, callbackUrl) {
  const accessToken = await getPluginToken({
    tenant: req.headers.tenant,
    apiPath: plugin.apiPath,
    authAcquire: plugin.authAcquire
  });
  return fetchPlugin({
    url: callbackUrl.href,
    tenant: req.headers.tenant,
    accessToken,
    headers: {
      user: req.headers.user
    }
  })
}

export function redirectToPluginMfe(req, res) {
  Plugin.findOne({tenant: req.headers.tenant, _id: req.params.pluginId})
    .select('callbackUrl apiPath authAcquire')
    .lean()
    .exec()
    .then(async (plugin) => {
      if (!plugin) {
        res.status(404).end();
        return;
      }
      if (plugin.callbackUrl) {
        const callbackUrl = new URL(plugin.callbackUrl);
        callbackUrl.searchParams.append('returnUrl', req.query.returnUrl || '');
        let pluginRes = await fetchPluginCallback(req, plugin, callbackUrl);

        if (pluginRes.status >= 400) {
          await clearPluginAccessToken(req.headers.tenant, plugin.apiPath);
          pluginRes = await fetchPluginCallback(req, plugin, callbackUrl);
        }

        const data = await pluginRes.json();

        res.redirect(302, data.returnUrl || req.query.returnUrl);
        res.end();
        return;
      }

      res.status(400).end();
    })
    .catch(() => {
      res.status(500).json({message: 'could not find plugin'}).end();
    })
}


export function getPlugin(req, res) {
  Plugin.findOne({tenant: req.headers.tenant, _id: req.params.pluginId}).select('-token -auth').lean()
    .then(plugin => {
      res.json(plugin).end();
    })
    .catch(() => {
      res.status(500).json({message: 'could not find plugin'}).end();
    })
}

export async function createPlugin(req, res) {
  const {tenant, token, auth, hardReset = true, ...allowedChanges} = req.body;
  const plugin = new Plugin(allowedChanges);
  plugin.tenant = req.headers.tenant;

  const newRefreshToken = allowedChanges.authAcquire?.refreshToken;

  try {
    await plugin.save()
    await enrichPluginWithManifest(plugin, {
      hardReset,
      tenant: req.headers.tenant,
      host: req.headers.tenanthost,
      appUrl: new URL(req.url).origin
    });
    await plugin.save();

    res.json(plugin).end();
    if (newRefreshToken) {
      setRefreshSecret(tenant, plugin.apiPath, newRefreshToken).catch();
    }
  } catch {
    res.status(500).json({message: 'could not create plugin'}).end();
  }
}

export async function updatePlugin(req, res) {
  try {
    const plugin = await Plugin.findOne({tenant: req.headers.tenant, _id: req.params.pluginId});
    if (!plugin) {
      throw new Error('plugin not found');
    }
    const {tenant, token, auth, hardReset = false, ...allowedChanges} = req.body;

    const newRefreshToken = allowedChanges.authAcquire?.refreshToken;
    Object.assign(plugin, allowedChanges);

    plugin.encodePath();


    if (newRefreshToken) {
      setRefreshSecret(tenant, plugin.apiPath, newRefreshToken).catch(() => null);
    }

    await enrichPluginWithManifest(plugin, {
      hardReset,
      tenant: req.headers.tenant,
      host: req.headers.tenanthost,
      appUrl: req.headers.origin
    });

    await plugin.save();
    res.json(plugin).end();
  } catch {
    res.status(500).json({message: 'could not update plugin'}).end();
  }
}

export async function removePlugin(req, res) {
  try {
    const tenant = req.headers.tenant;
    const plugin = await Plugin.findOne({
      tenant,
      _id: req.params.pluginId
    }).select('tenant name apiPath').exec();
    if (plugin) {
      setRefreshSecret(tenant, plugin.apiPath, '').catch(() => null);
      await Promise.all([
        removeUser(tenant, plugin.user),
        plugin.remove()
      ]);
      res.json(plugin).end();
    } else {
      res.status(404).json({message: 'could not find plugin'}).end();
    }
  } catch {
    res.status(500).json({message: 'could not remove plugin'}).end();
  }
}
