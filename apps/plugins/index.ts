import {start} from '@greenpress/api-kit';
import {connect} from './server/models';
import {mongoUri} from './config';
import {loadRoutes} from './server/routes';
//
// // connect to the database and load models
connect(mongoUri)

loadRoutes().then(() => {
  start('Plugins Service', process.env.PORT || 9006, process.env.IP || '127.0.0.1')
})
