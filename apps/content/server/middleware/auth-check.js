const authErr = '{"message":"you are not authorized"}'

function onlyAuthenticated (req, res, next) {
  if (!req.user) {
    res.status(401).set('Content-Type', 'application/json').end(authErr)
  }
  else next();
}

function onlyEditor (req, res, next) {
  if (!(req.user && req.user.isEditor)) {
    res.status(401).set('Content-Type', 'application/json').end(authErr)
  }
  else next();
}

function onlyAdmin (req, res, next) {
  if (!(req.user && req.user.isAdmin)) {
    res.status(401).set('Content-Type', 'application/json').end(authErr)
  }
  else next();
}

module.exports = {
  onlyAuthenticated,
  onlyEditor,
  onlyAdmin
}
