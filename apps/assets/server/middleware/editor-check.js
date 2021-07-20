const { editorsRoles } = require('../../config');
/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  if (!req.user) {
    res.status(401).end();
    return;
  }

  if (req.user.roles.find(role => editorsRoles.includes(role))) {
    req.user.isEditor = true;
    next();
  } else {
    res.status(401).end();
  }
};
