process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import 'reflect-metadata';
import App from './app';
import { IndexController } from '@controllers/index.controller';

const app = new App({
  serviceName: process.env.SERVICE_NAME || 'APP',
  controllers: [ IndexController ] });
app.listen();
