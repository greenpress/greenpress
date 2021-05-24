const authService = require('@greenpress/api-kit/internal-service').service('AUTH')

function callAuthService (url, options) {
  return authService({
    ...options,
    url,
  })
    .then(axiosRes => axiosRes.data)
}

module.exports = callAuthService
