const { internalServicesSecret, secretsToken } = require('../config')
const secretsService = require('@greenpress/api-kit/internal-service').service('SECRETS');

function callSecretsService (url, tenant, key, value) {
  return secretsService({
    headers: { internal_secret: internalServicesSecret, tenant },
    method: 'POST',
    data: {
      key,
      value,
      token: secretsToken
    },
    url
  })
    .then(axiosRes => axiosRes.data)
}

function getSecret (tenant, key) {
  return callSecretsService('/api/secrets/get', tenant, key)
}

function setSecret (tenant, key, value) {
  return callSecretsService('/api/secrets/set', tenant, key, value)
}

module.exports = { getSecret, setSecret }
