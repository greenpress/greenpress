import {privilegedRoles} from '../../config';

export default function onlyPrivileged(req, res, next) {
  if (req.user.roles.find(role => privilegedRoles.includes(role))) {
    req.user.isPrivileged = true
    return next()
  }

  return res.status(401).end()
};
