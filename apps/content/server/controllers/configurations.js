const Configuration = require('../models/configuration')

function getConfigurationByKey (req, res, next) {
  Configuration.getByKey(req.headers.tenant, req.params.configKey, req.user && req.user.isAdmin)
    .then(configuration => {
      if (!configuration) {
        return Promise.reject(null)
      }
      req.configuration = configuration
      return next()
    })
    .catch(() => res.status(404).json({ message: 'configuration not exists' }).end())
}

function getConfigurationsList (req, res) {
  Configuration.find({ tenant: req.headers.tenant })
    .select('key public description created')
    .lean()
    .then(list => {
      return res.status(200).json(list || []).end()
    })
    .catch(() => res.status(401).json({ message: 'failed to load configurations list' }).end())
}

function getConfiguration (req, res) {
  if (typeof req.configuration === 'string') {
    res.status(200).set('Content-Type', 'application/json').end(req.configuration)
  } else {
    res.status(200).json(req.configuration).end()
  }
}

function updateConfiguration (req, res) {
  const body = req.body || {}
  delete body.tenant
  const configuration = req.configuration

  if (body.description) {
    configuration.description = body.description
  }
  if (body.metadata) {
    configuration.metadata = Object.assign({}, configuration.metadata, body.metadata)
  }

  configuration.save()
    .then(() => {
      res.status(200).json(configuration).end()
    })
    .catch(() => {
      res.status(400).json({ message: 'configuration update failed' }).end()
    })
}

module.exports = {
  getConfigurationsList,
  getConfigurationByKey,
  getConfiguration,
  updateConfiguration
}
