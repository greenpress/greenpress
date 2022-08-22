import {internalServicesSecret, secretsToken} from '../../config';
import {service} from '@greenpress/api-kit';

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

export function getEncryptedData(tenant: string, userId: string): Promise<{ value: string }> {
  return callSecretsService('/api/secrets/get', tenant, `user-encrypted-data-${tenant}-${userId}`)
}

export function setEncryptedData(tenant: string, userId: string, value: string) {
  return callSecretsService('/api/secrets/set', tenant, `user-encrypted-data-${tenant}-${userId}`, value)
}
