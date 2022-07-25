import Plugin from '../models/plugin';

export function getAllPlugins(req, res) {
  Plugin.find({tenant: req.headers.tenant}).select('-token').lean()
    .then(list => {
      res.json(list).end();
    })
    .catch(() => {
      res.status(500).json({message: 'could not get plugins'}).end();
    })
}

export function getPlugin(req, res) {
  Plugin.findOne({tenant: req.headers.tenant, _id: req.params.pluginId}).select('-token').lean()
    .then(plugin => {
      res.json(plugin).end();
    })
    .catch(() => {
      res.status(500).json({message: 'could not find plugin'}).end();
    })
}

export function createPlugin(req, res) {
  const plugin = new Plugin(req.body);
  plugin.tenant = req.headers.tenant;
  plugin.save()
    .then((plugin) => {
      res.json(plugin).end();
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
    const {tenant, ...allowedChanges} = req.body;

    Object.assign(plugin, allowedChanges);

    await plugin.save();
    res.json(plugin).end();
  } catch (e) {
    res.status(500).json({message: 'could not update plugin'}).end();
  }
}

export function removePlugin(req, res) {
  Plugin.deleteOne({tenant: req.headers.tenant, _id: req.params.pluginId})
    .then(() => {
      res.json({tenant: req.headers.tenant, _id: req.params.pluginId}).end();
    })
    .catch(() => {
      res.status(500).json({message: 'could not remove plugin'}).end();
    })
}
