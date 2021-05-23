const { mongoUri } = require('./config')

// connect to the database and load models
require('./server/models').connect(mongoUri)

require('./server/routes')

require('@greenpress/api-kit')
  .start('Assets Service',
    process.env.PORT || 9003,
    process.env.IP || '127.0.0.1')
