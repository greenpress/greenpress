const { internalSecret } = require('../../config')

module.exports = (req, res, next) => {
  if (req.headers.internal_secret === internalSecret) {
    next()
  } else {
    return res.status(401).json({ message: 'you are not allowed' }).end()
  }
}
