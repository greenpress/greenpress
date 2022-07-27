import Plugin from '../models/plugin';
import {setRefreshSecret} from '../services/tokens-management';

export function getAllPlugins(req, res) {
  Plugin.find({tenant: req.headers.tenant}).select('-token -auth').lean()
    .then(list => {
      res.json(list).end();
    })
    .catch(() => {
      res.status(500).json({message: 'could not get plugins'}).end();
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

export function createPlugin(req, res) {
  const {tenant, token, auth, ...allowedChanges} = req.body;
  const plugin = new Plugin(allowedChanges);
  plugin.tenant = req.headers.tenant;

  const newRefreshToken = allowedChanges.authAcquire?.refreshToken;

  plugin.save()
    .then((plugin) => {
      res.json(plugin).end();

      if (newRefreshToken) {
        setRefreshSecret(tenant, plugin.apiPath, newRefreshToken).catch();
      }
    })
    .catch(() => {
      res.status(500).json({message: 'could not create plugin'}).end();
    })
}

export async function updatePlugin(req, res) {
  try {
    const plugin = await Plugin.findOne({tenant: req.headers.tenant, _id: req.params.pluginId});
    if (!plugin) {
      throw new Error('plugin not found');
    }
    const {tenant, token, auth, ...allowedChanges} = req.body;

    const newRefreshToken = allowedChanges.authAcquire?.refreshToken;

    Object.assign(plugin, allowedChanges);

    await plugin.save();
    res.json(plugin).end();

    if (newRefreshToken) {
      setRefreshSecret(tenant, plugin.apiPath, newRefreshToken).catch();
    }
  } catch (e) {
    res.status(500).json({message: 'could not update plugin'}).end();
  }
}

export async function removePlugin(req, res) {
  try {
    const plugin = await Plugin.findOne({tenant: req.headers.tenant, _id: req.params.pluginId}).select('tenant name apiPath')
    if (plugin) {
      setRefreshSecret(plugin.tenant, plugin.apiPath, '').catch();
      await plugin.remove();
      res.json(plugin).end();
    } else {
      res.status(404).json({message: 'could not find plugin'}).end();
    }
  } catch {
    res.status(500).json({message: 'could not remove plugin'}).end();
  }
}
