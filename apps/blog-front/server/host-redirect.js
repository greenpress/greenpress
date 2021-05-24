function setHostRedirect (app, applicationUrl) {
  const host = new URL(applicationUrl).host
  const LOCALHOST = 'localhost'
  const HOST_HEADER = 'host'

  function hostRedirect (req, res, next) {
    const requestHost = req.header(HOST_HEADER)
    if (requestHost.startsWith(LOCALHOST) || requestHost === host) {
      next()
    } else {
      res.redirect(301, new URL(req.originalUrl, applicationUrl))
    }
  }

  app.use(hostRedirect)
}

module.exports = function (app) {
  const { applicationUrl } = require('../config')
  if (!applicationUrl) {
    return
  }
  setHostRedirect(app, applicationUrl)
}
