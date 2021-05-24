const { editorsRoles } = require('../../config')
/**
 *  The Auth Checker middleware function.
 */
export default (req, res, next) => {
  if (!req.user) {
    return res.status(401).end()
  }

  if (req.user.roles.find(role => editorsRoles.includes(role))) {
    req.user.isEditor = true
    return next()
  }

  return res.status(401).end()
};
