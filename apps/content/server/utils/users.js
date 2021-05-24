const callAuthService = require('./call-auth-service')
const cacheManager = require('./cache-manager')
const cachePrefix = 'usersDisplays:'

function getUsersFromApi (tenant, users) {
  return callAuthService('/api/users', {
    params: { users },
    headers: { tenant }
  })
}

module.exports = {
  getUsersMap (tenant, ids) {
    const users = ids.join(',')
    return cacheManager.wrap(cachePrefix + tenant + ':' + users,
      () => getUsersFromApi(tenant, users)
        .then(users => users.reduce((usersMap, user) => {
          usersMap[user._id] = user
          return usersMap
        }, {}))
    )
  }
}
