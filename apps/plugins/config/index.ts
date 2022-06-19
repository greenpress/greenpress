export const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/plugins-service'
export const internalServicesSecret = process.env.INTERNAL_SECRET
export const secretsToken = process.env.SECRETS_TOKEN
export const privilegedRoles = process.env.PRIVILEGED_ROLES ? process.env.PRIVILEGED_ROLES.split(',') : ['admin'];
export const proxyApiPrefix = process.env.PROXY_API_PREFIX || '/api/on';
