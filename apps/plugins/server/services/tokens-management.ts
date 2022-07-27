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

export function getRefreshSecret(tenant: string, apiPath: string): Promise<{ value: string }> {
  return callSecretsService('/api/secrets/get', tenant, `refresh-token-${tenant}-${apiPath}`)
}

export function setRefreshSecret(tenant: string, apiPath: string, refreshToken: string) {
  return callSecretsService('/api/secrets/set', tenant, `refresh-token-${tenant}-${apiPath}`, refreshToken)
}
