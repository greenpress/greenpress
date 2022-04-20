const config = require('./config');

const services = config.services;

const DEV = 'development'
const PROD = 'production'

const node_args = config.memoryLimitation ?
  [
    '--optimize_for_size',
    '--max_old_space_size=' + parseInt(Number(config.memoryLimitation) * 0.8)
  ] :
  ''

const basicHttpServiceOpts = {
  instances: 1,
  autorestart: true,
  watch: false,
  max_memory_restart: config.memoryLimitation ? `${config.memoryLimitation}M` : '1G',
  node_args
}

const authServiceRef = {
  AUTH_SERVICE_PORT: services.auth.port,
  AUTH_SERVICE_IP: services.auth.ip
}


const db = config.noDocker ?
  {
    name: 'db',
    script: 'mongod',
    args: '--dbpath ./db-data',
    instances: 1,
  } : {
    name: 'db',
    script: 'docker',
    args: `run -p 27017-27019:27017-27019 -v ${process.cwd()}/db-data:/data/db mongo`,
    instances: 1
  };

const getHttpServiceVariables = (name, variables) => {
  return {
    name,
    script: services[name].script,
    cwd: services[name].cwd,
    ...basicHttpServiceOpts,
    env: {
      NODE_ENV: DEV,
      ...variables
    },
    env_production: {
      NODE_ENV: PROD,
      ...variables
    }
  }
}

module.exports = {
  db,
  secrets: getHttpServiceVariables('secrets', {
    MONGO_URI: config.mongoUri,
    PORT: services.secrets.port,
    IP: services.secrets.ip,
    SECRET: services.secrets.secret,
    INTERNAL_SECRET: config.internalSecret,
  }),
  auth: getHttpServiceVariables('auth', {
    MONGO_URI: config.mongoUri,
    JWT_SECRET: config.jwtSecret,
    REFRESH_TOKEN_SECRET: config.refreshTokenSecret,
    TOKEN_EXPIRATION: services.auth.tokenExpiration,
    REFRESH_TOKEN_EXPIRATION: services.auth.refreshTokenExpiration,
    COOKIE_TOKEN_VERIFICATION_TIME: services.auth.cookieTokenVerificationTime,
    PROCESSED_COOKIE_EXPIRATION: services.auth.processedCookieExpiration,
    COOKIE_TOKEN_EXPIRATION: services.auth.cookieTokenExpiration,
    PORT: services.auth.port,
    IP: services.auth.ip,
    ROLES: config.roles.all,
    DEFAULT_ROLE: config.roles.default,
    PRIVILEGED_ROLES: config.roles.privileged,
    REDIS_URL: config.redisUrl
  }),
  content: getHttpServiceVariables('content', {
    MONGO_URI: config.mongoUri,
    PORT: services.content.port,
    IP: services.content.ip,
    ...authServiceRef,
    EDITORS_ROLES: config.roles.editors,
    REDIS_URL: config.redisUrl
  }),
  drafts: getHttpServiceVariables('drafts', {
    MONGO_URI: config.mongoUri,
    PORT: services.drafts.port,
    IP: services.drafts.ip
  }),
  assets: getHttpServiceVariables('assets', {
    MONGO_URI: config.mongoUri,
    PORT: services.assets.port,
    IP: services.assets.ip,
    SECRETS_TOKEN: services.assets.secret,
    INTERNAL_SECRET: config.internalSecret,
    SECRETS_SERVICE_URL: services.secrets.ip,
    SECRETS_SERVICE_PROTOCOL: services.secrets.protocol,
    SECRETS_SERVICE_PORT: services.secrets.port,
    TEMP_FOLDER: config.tempFolder,
    ...authServiceRef
  }),
  front: getHttpServiceVariables('front', {
    PORT: config.port,
    THEME: services.front.theme,
    NODE_ENV: DEV,
    TENANT: config.tenant,
    APPLICATION_URL: config.applicationUrl,
    ALTERNATIVE_HMR: config.alternativeHmr
  }),
  admin: getHttpServiceVariables('admin', {
    PORT: services.admin.port,
    BASE_URL: '/gp-admin',
    VUE_APP_MAIN_APP_URL: 'http://localhost:' + config.port,
    ALTERNATIVE_HMR: config.alternativeHmr
  })
}
