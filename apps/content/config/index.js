const adminRole = process.env.ADMIN_ROLE || 'admin'
const editorsRoles = process.env.EDITORS_ROLES ? process.env.EDITORS_ROLES.split(',') : ['editor', adminRole]

module.exports = {
  port: process.env.PORT || 9001,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost/content-service',
  authService: {
    protocol: process.env.AUTH_SERVICE_PROTOCOL || 'http',
    url: process.env.AUTH_SERVICE_URL || 'localhost',
    port: process.env.AUTH_SERVICE_PORT || 9000,
  },
  editorsRoles,
  adminRole,
  appConfiguration: process.env.APP_CONFIGURATION || 'app-configuration',
  redisUrl: process.env.REDIS_URL
}
