const { join } = require('path')

const appAbsolutePath = join('../../apps/greenpress');
const IS_PROD = process.env.NODE_ENV !== 'development'

const localhost = '127.0.0.1';
const port = process.env.PORT || 3000;

module.exports = {
  appAbsolutePath,
  port,
  roles: {
    all: 'user,editor,admin',
    default: 'user',
    privileged: 'admin',
    editors: 'editor,admin'
  },
  tenant: process.env.BASIC_TENANT || '0',
  tempFolder: process.env.TEMP_FOLDER || (join(appAbsolutePath, 'tmp')),
  excludedServices: process.env.npm_config_x ? process.env.npm_config_x.split(',') : ['db'],
  noDocker: process.env.npm_config_noDocker || false,
  memoryLimitation: process.env.MAX_MEMORY_USAGE,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost/greenpress',
  redisUrl: process.env.REDIS_URL,
  applicationUrl: process.env.APPLICATION_URL,
  internalSecret: process.env.INTERNAL_SECRET || (Date.now() / Number(Date.now().toString().substring(-5)) * Math.random()).toString(),
  alternativeHmr: process.env.ALTERNATIVE_HMR,
  services: {
    auth: {
      jwtSecret: process.env.JWT_SECRET || 'a secret phrase!!',
      refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'a secret 2 phrase!!',
      port: process.env.AUTH_PORT || 9000,
      ip: process.env.AUTH_IP || localhost,
      cwd: process.env.AUTH_SERVICE_CWD || join(appAbsolutePath, './node_modules/@greenpress/auth'),
      script: process.env.AUTH_SERVICE_SCRIPT || 'dist/index.js',
      tokenExpiration: process.env.TOKEN_EXPIRATION,
      refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION,
      cookieTokenVerificationTime: process.env.COOKIE_TOKEN_VERIFICATION_TIME,
      cookieTokenExpiration: process.env.COOKIE_TOKEN_EXPIRATION,
    },
    secrets: {
      secret: process.env.SECRETS_SERVICE_SECRET || 'ENCRYPT_INTERNAL_DATA',
      port: process.env.SECRETS_PORT || 9002,
      ip: process.env.SECRETS_IP || localhost,
      protocol: process.env.SECRETS_SERVICE_PROTOCOL || 'http',
      cwd: process.env.SECRETS_SERVICE_CWD || join(appAbsolutePath, './node_modules/@greenpress/secrets'),
      script: process.env.SECRETS_SERVICE_SCRIPT || 'index.js'
    },
    assets: {
      secret: process.env.ASSETS_SECRETS_TOKEN || 'assets-token-phrase',
      port: process.env.ASSETS_PORT || 9003,
      ip: process.env.ASSETS_IP || localhost,
      cwd: process.env.ASSETS_SERVICE_CWD || join(appAbsolutePath, './node_modules/@greenpress/assets'),
      script: process.env.ASSETS_SERVICE_SCRIPT || 'index.js'
    },
    content: {
      port: process.env.CONTENT_PORT || 9001,
      ip: process.env.CONTENT_IP || localhost,
      cwd: process.env.CONTENT_SERVICE_CWD || join(appAbsolutePath, './node_modules/@greenpress/content'),
      script: process.env.CONTENT_SERVICE_SCRIPT || 'index.js'
    },
    drafts: {
      port: process.env.DRAFTS_PORT || 9005,
      ip: process.env.DRAFTS_IP || localhost,
      cwd: process.env.DRAFTS_SERVICE_CWD || join(appAbsolutePath, './node_modules/@greenpress/drafts'),
      script: process.env.DRAFTS_SERVICE_SCRIPT || 'dist/index.js'
    },
    admin: {
      port: process.env.ADMIN_PORT || 3001,
      ip: process.env.ADMIN_IP || localhost,
      cwd: process.env.ADMIN_SERVICE_CWD || join(appAbsolutePath, './node_modules/@greenpress/admin'),
      script: process.env.ADMIN_SERVICE_SCRIPT ||  (IS_PROD ? 'server.js' : 'npm run dev')
    },
    front: {
      theme: process.env.FRONT_THEME || 'damal',
      cwd: process.env.FRONT_SERVICE_CWD || join(appAbsolutePath, './node_modules/@greenpress/blog-front'),
      script: process.env.FRONT_SERVICE_SCRIPT || (IS_PROD ? 'npm run build && npm start' : 'npm run build && npm run dev')
    }
  }
}
