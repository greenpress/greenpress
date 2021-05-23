const verifyUser = require('./verify-user')
const User = require('../models/user')

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  verifyUser(req, res, () => {
    const { sub: _id, tenant } = req.payload
    User.findOne({ _id, tenant }).lean().then(user => {
      // pass user details onto next route
      req.user = user
      req.user.isPrivileged = req.userPayload.isPrivileged
      return next()
    }).catch(() => {
      return next()
    })
  })

}
