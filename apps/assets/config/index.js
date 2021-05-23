const editorsRoles = process.env.EDITORS_ROLES ? process.env.EDITORS_ROLES.split(',') : ['editor', 'admin']

module.exports = {
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost/assets-service',
  internalServicesSecret: process.env.INTERNAL_SECRET,
  secretsToken: process.env.SECRETS_TOKEN,
  editorsRoles,
}
