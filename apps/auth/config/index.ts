const roles = process.env.ROLES ? process.env.ROLES.split(',') : ['user', 'admin']
const privilegedRoles = process.env.PRIVILEGED_ROLES ? process.env.PRIVILEGED_ROLES.split(',') : ['admin']
const TEN_MINUTES = 1000 * 60 * 10
const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30

const config  = {
	mongoUri: process.env.MONGO_URI || 'mongodb://localhost/auth-service',
	cookieBaseDomain: process.env.COOKIE_BASE_DOMAIN ||
		(process.env.APPLICATION_URL ? new URL(process.env.APPLICATION_URL).hostname.replace(/www\.|www/, '') : null),
	jwtSecret: process.env.JWT_SECRET || 'abcddddd',
	refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'a secret 2 phrase!!',
	tokenExpiration: process.env.TOKEN_EXPIRATION || '10m',
	refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || '30d',
	cookieTokenVerificationTime: Number(process.env.COOKIE_TOKEN_VERIFICATION_TIME || TEN_MINUTES),
	cookieTokenExpiration: Number(process.env.COOKIE_TOKEN_EXPIRATION || THIRTY_DAYS),
	roles,
	privilegedRoles,
	defaultRole: process.env.DEFAULT_ROLE ? process.env.DEFAULT_ROLE : roles[0],
	defaultAuthType: process.env.DEFAULT_AUTH_TYPE || 'cookie'
}
export default config 