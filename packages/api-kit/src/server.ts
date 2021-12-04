process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import 'reflect-metadata';
import App from './app';
import { IndexController } from '@controllers/index.controller';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([ IndexController]);
app.listen();
