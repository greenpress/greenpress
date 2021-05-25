const SecretsService = require('../services/secrets');

module.exports = function setSecret(req, res) {
  const { key, value, token } = req.body || {}

  if (!(key && token)) {
    return res.status(400).json({ message: 'you are not authorized' }).end()
  }

  SecretsService.setEncrypted(req.headers.tenant, key, value, token)
    .then(() => {
      res.status(200).json({ key: key }).end()
    })
    .catch(() => {
      res.status(400).json().end()
    })
}
