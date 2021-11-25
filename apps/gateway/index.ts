import {start, config, app as getApp} from '@greenpress/api-kit';
import {loadHostRedirect} from './host-redirect';

config({cors: false, bodyParser: false});

const app = getApp();
loadHostRedirect(app)
require('@greenpress/api-proxy-middleware')(app)

start('Gateway', process.env.PORT || 3000, process.env.IP || '127.0.0.1')
