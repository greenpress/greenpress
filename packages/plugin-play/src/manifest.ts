const pkg = require(process.cwd() + '/package.json');

export const manifest = {
  name: pkg.name,
  description: pkg.description,
  appUrl: process.env.APP_URL || '',
  apiPath: pkg.name,
  manifestUrl: '/api/play-manifest',
  registerUrl: '/api/register',
  callbackUrl: '/api/callback',
  proxyPath: '/api/play',
  proxyUrl: '',
  subscribedEvents: [],
  microFrontends: [],
  authAcquire: {
    refreshTokenUrl: '/api/token/refresh',
    refreshTokenKey: 'refresh_token',
    accessTokenKey: 'access_token'
  },
};

export type ManifestOptions = Partial<typeof manifest> & { appUrl?: string };

export default manifest;
