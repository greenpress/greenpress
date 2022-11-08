import fetch from 'node-fetch';
import httpAgent from './http-agent';

export function fetchPlugin({url, method = 'GET', tenant, accessToken, body = '', headers = {}}) {
  return fetch(url, {
    method,
    body: body || undefined,
    agent: httpAgent,
    headers: {
      'x-tenant': tenant,
      'x-from': 'greenpress',
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
      ...headers
    },
  });
}
