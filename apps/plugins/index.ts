import {mongoUri} from './config';

// connect to the database and load models
require('./server/models').connect(mongoUri)

require('./server/routes');

require('@greenpress/api-kit')
    .start('Plugins Service',
        process.env.PORT || 9006,
        process.env.IP || '127.0.0.1')
