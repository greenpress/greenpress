import {internalServicesSecret, secretsToken} from '../../config';
import {service} from '@greenpress/api-kit/internal-service';
const secretsService = service('SECRETS');

function callSecretsService(url: string, tenant: string, key: string, value?: any) {
  return secretsService({
    headers: {internal_secret: internalServicesSecret, tenant},
    method: 'POST',
    data: {
      key,
      value,
      token: secretsToken
    },
    url
  })
    .then((axiosRes: any) => axiosRes.data)
}

export function getSecret(tenant: string, key: string) {
  return callSecretsService('/api/secrets/get', tenant, key)
}

export function setSecret(tenant: string, key: string, value: any) {
  return callSecretsService('/api/secrets/set', tenant, key, value)
}
