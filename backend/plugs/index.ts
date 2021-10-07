import {start} from '@greenpress/api-kit';
import {mongoUri} from './config';
import {loadRoutes} from './server/routes';

// connect to the database and load models
require('./server/models').connect(mongoUri)

loadRoutes().then(() => {
  start('Plugins Service', process.env.PORT || 9006, process.env.IP || '127.0.0.1')
})

