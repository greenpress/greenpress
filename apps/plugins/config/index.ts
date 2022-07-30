export const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/plugins-service'
export const redisUrl = process.env.REDIS_URL;
export const internalServicesSecret = process.env.INTERNAL_SECRET
export const secretsToken = process.env.SECRETS_TOKEN || process.env.PLUGINS_SERVICE_SECRET;
export const privilegedEditingRoles = process.env.PRIVILEGED_EDIT_ROLES ? process.env.PRIVILEGED_EDIT_ROLES.split(',') : ['admin'];
export const privilegedViewingRoles = process.env.PRIVILEGED_VIEW_ROLES ? process.env.PRIVILEGED_VIEW_ROLES.split(',') : ['plugin', 'editor', 'admin'];
export const proxyApiPrefix = process.env.PROXY_API_PREFIX || '/api/on';
