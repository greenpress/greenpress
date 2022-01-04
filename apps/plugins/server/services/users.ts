import {internalServicesSecret} from '../../config';
import {service} from '@greenpress/api-kit';
const authService = service('AUTH');

function callAuthService(url: string, method: 'POST' | 'DELETE', tenant: string, data?: any) {
  return authService({
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
