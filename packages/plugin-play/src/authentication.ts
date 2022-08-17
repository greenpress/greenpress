import {RouteOptions} from 'fastify/types/route';
import jwt from 'jsonwebtoken';
import GpUsers from '@greenpress/sdk/dist/users';
import manifest from './manifest';
import handlers, {StandardPayload} from './handlers';
import config from './config';

const notAuthorized = {message: 'you are not authorized'};

export function getRefreshTokenRoute(): RouteOptions {

  const usersSdk = new GpUsers<{ tokenIdentifier: string }>({fetch: globalThis.fetch, appUrl: config.greenpressUrl});

  if (config.greenpressUrl) {
    handlers.refreshToken.push(async (payload) => {
      const user = await usersSdk.getUser(payload.sub);
      if (payload.identifier !== user.internalMetadata?.tokenIdentifier) {
        throw new Error('user is not verified on greenpress BaaS')
      }
      const newPayload: StandardPayload = {
        sub: payload.sub,
        identifier: (Date.now() + Math.random()).toString().substring(0, 10)
      }
      await usersSdk.update(payload.sub, {internalMetadata: {tokenIdentifier: newPayload.identifier}})
      return newPayload;
    })
  }

  return {
    method: 'POST',
    url: manifest.authAcquire.refreshTokenUrl,
    handler: async (request, reply) => {
      const expectedRefreshToken = request.headers['authorization']?.split(' ')[1];
      if (!expectedRefreshToken) {
        reply.statusCode = 401;
        return notAuthorized;
      }
      let payload: StandardPayload;
      try {
        payload = jwt.verify(expectedRefreshToken, config.refreshTokenSecret);
        if (handlers.refreshToken.length) {
          for (let handler of handlers.refreshToken) {
            const result = await handler(payload, request);
            if (result?.payload as StandardPayload) {
              return {
                [manifest.authAcquire.refreshTokenKey]: jwt.sign(result.payload, config.refreshTokenSecret, {expiresIn: '90d'}),
                [manifest.authAcquire.accessTokenKey]: jwt.sign(result.payload, config.accessTokenSecret, {expiresIn: '1h'}),
              }
            }
          }
        }
      } catch (err) {
        if (config.dev) {
          console.log(err);
        }
      }
      reply.statusCode = 401;
      return notAuthorized;
    }
  };
}
