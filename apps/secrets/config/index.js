module.exports = {
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost/secrets-service',
  secretKey: process.env.SECRET || process.env.SECRETS_SERVICE_SECRET || 'secrets-service-secret',
  internalSecret: process.env.INTERNAL_SECRET || 'no one can access this service without it',
}
