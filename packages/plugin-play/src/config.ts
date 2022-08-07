const config = {
  port: process.env.PORT || 5555,
  host: process.env.HOST || '0.0.0.0',
  dev: process.env.NODE_ENV !== 'production',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  greenpressUrl: process.env.GREENPRESS_URL,
  greenpressUsername: process.env.GREENPRESS_USERNAME,
  greenpressPassword: process.env.GREENPRESS_PASSWORD,
};

export type ConfigOptions = Partial<typeof config>;

export function setConfig(appConfig: ConfigOptions) {
  Object.assign(config, appConfig);
}

export default config;
