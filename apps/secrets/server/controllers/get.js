const SecretService = require('../services/secrets');

module.exports = function getSecret(req, res) {
  const { key, token } = req.body || {}

  if (!(key && token)) {
    return res.status(400).json({ message: 'you are not authorized' }).end()
  }

  return SecretService.getDecrypted(req.headers.tenant, key, token)
    .then(result => {
      res.status(200).json(result).end()
    })
    .catch(() => {
      return res.status(400).end();
    })
}
