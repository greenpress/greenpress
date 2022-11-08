import { join } from 'path';

const config = {
  port: process.env.PORT || 1086,
  host: process.env.HOST || '0.0.0.0',
  dev: process.env.NODE_ENV !== 'production',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  greenpressUrl: process.env.GREENPRESS_URL,
  greenpressUsername: process.env.GREENPRESS_USERNAME,
  greenpressPassword: process.env.GREENPRESS_PASSWORD,
  staticFrontend: {
    root: join(process.cwd(), process.env.STATIC_ROOT || 'public'),
    prefix: process.env.STATIC_PREFIX || '/',
  }
};

export type ConfigOptions = Partial<typeof config>;

export function setConfig(appConfig: ConfigOptions) {
  Object.assign(config, appConfig);
}

export default config;
