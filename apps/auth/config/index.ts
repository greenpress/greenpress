const TEN_MINUTES = 1000 * 60 * 10
const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30
export const privilegedRoles = process.env.PRIVILEGED_ROLES ? process.env.PRIVILEGED_ROLES.split(',') : ['admin']

export const roles = process.env.ROLES ? process.env.ROLES.split(',') : ['user', 'admin']

export const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/auth-service';
export const cookieBaseDomain = process.env.COOKIE_BASE_DOMAIN ||
  (process.env.APPLICATION_URL ?
    new URL(process.env.APPLICATION_URL).hostname.replace(/www\.|www/, '')
    : null
  );
export const jwtSecret = process.env.JWT_SECRET || 'abcddddd';
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'a secret 2 phrase!!';
export const tokenExpiration = process.env.TOKEN_EXPIRATION || '10m';
export const refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION || '30d';
export const cookieTokenVerificationTime = Number(process.env.COOKIE_TOKEN_VERIFICATION_TIME || TEN_MINUTES);
export const cookieTokenExpiration = Number(process.env.COOKIE_TOKEN_EXPIRATION || THIRTY_DAYS);
export const defaultRole = process.env.DEFAULT_ROLE ? process.env.DEFAULT_ROLE : roles[0];
export const defaultAuthType = process.env.DEFAULT_AUTH_TYPE || 'cookie';
