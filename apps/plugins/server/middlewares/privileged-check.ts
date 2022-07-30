import {privilegedEditingRoles, privilegedViewingRoles} from '../../config';

export function onlyViewPrivileged(req, res, next) {
  if (req.user.roles.find(role => privilegedViewingRoles.includes(role))) {
    req.user.isPrivileged = true
    return next()
  }

  return res.status(401).end()
}

export function onlyEditPrivileged(req, res, next) {
  if (req.user.roles.find(role => privilegedEditingRoles.includes(role))) {
    req.user.isPrivileged = true
    return next()
  }

  return res.status(401).end()
}
