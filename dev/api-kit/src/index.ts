import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { ipFallback, isProduction, corsConfig, bodyParserConfig } from './constants';
import { ServerConfig } from './types';
import bodyParserMap from './helpers/body-parser-map';

let App: any | Express;

const { PORT } = process.env;

let config: ServerConfig = {
	cors: corsConfig,
	bodyParser: bodyParserConfig,
};

function createApp() {
	App = express();

	if (!isProduction) App.use(morgan('combined'));

	if (config.cors) App.use(cors());

	if (config.bodyParser) App.use(bodyParserMap(config.bodyParser)());

	return App;
}

function startApp(serviceName: string = 'APP', port: string | undefined = PORT, ip: string = ipFallback) {
	App.set('port', port);
	App.set('ip', ip);

	// Start the Server
	return new Promise<void>(resolve => {
		App.listen(port, ip, () => {
			console.log(`${serviceName} is running on port`, Number(port));
			resolve();
		});
	});
}

export default {
	config: (updateConfig: ServerConfig = config) => {
		config = updateConfig;
		return config;
	},
	app: () => App || createApp(),
	start: startApp,
};
