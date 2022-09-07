import {internalServicesSecret} from '../../config';
import {service} from '@greenpress/api-kit';

const authService = service('AUTH', {port: process.env.AUTH_SERVICE_PORT || 9000});

function callAuthService(url: string, method: 'GET' | 'POST' | 'DELETE', tenant: string, data?: any) {
  return authService({
    headers: {internal_secret: internalServicesSecret, tenant},
    method,
    data,
    url
  })
    .then((axiosRes: any) => axiosRes.data)
}

export function getUsers(tenant: string, {email, exact = false}) {
  return callAuthService(`/internal-api/users?email=${email}` + (exact ? '&exact=true' : ''), 'GET', tenant);
}

export function createUser(tenant: string, {email, password, roles, firstName}) {
  return callAuthService('/internal-api/users', 'POST', tenant, {email, password, roles, firstName});
}

export function removeUser(tenant: string, userId: string) {
  return callAuthService('/internal-api/users/' + userId, 'DELETE', tenant)
}
