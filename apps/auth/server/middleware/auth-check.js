function onlyAuthenticated (req, res, next) {
  if (!req.userPayload) {
    return res.status(401).json({ message: 'you are not authorized' }).end()
  }
  next()
}

function onlyPrivileged (req, res, next) {
  if (!(req.userPayload && req.userPayload.isPrivileged)) {
    return res.status(401).json({ message: 'you are not authorized' }).end()
  }
  next()
}

module.exports = {
  onlyAuthenticated,
  onlyPrivileged
}
