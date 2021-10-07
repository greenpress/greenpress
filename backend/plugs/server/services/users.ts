import {internalServicesSecret} from '../../config';
const secretsService = require('@greenpress/api-kit/internal-service').service('AUTH');

function callAuthService(url: string, method: 'POST' | 'DELETE', tenant: string, data?: any) {
  return secretsService({
    headers: {internal_secret: internalServicesSecret, tenant},
    method,
    data,
    url
  })
    .then((axiosRes: any) => axiosRes.data)
}

export function createUser(tenant: string, email: string, password: string) {
  return callAuthService('/api/auth/users', 'POST', tenant, {email, password});
}

export function removeUser(tenant: string, userId: string, value: any) {
  return callAuthService('/api/auth/users/' + userId, 'DELETE', tenant)
}
