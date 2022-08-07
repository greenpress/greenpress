import {RouteOptions} from 'fastify/types/route';
import jwt from 'jsonwebtoken';
import manifest from './manifest';
import handlers from './handlers';
import config from './config';

const notAuthorized = {message: 'you are not authorized'};

export function getRefreshTokenRoute(): RouteOptions {
  return {
    method: 'POST',
    url: manifest.authAcquire.refreshTokenUrl,
    handler: async (request, reply) => {
      const expectedRefreshToken = request.headers['authorization']?.split(' ')[1];
      if (!expectedRefreshToken) {
        reply.statusCode = 401;
        return notAuthorized;
      }
      try {
        const payload = jwt.verify(expectedRefreshToken, config.refreshTokenSecret);
        if (handlers.refreshToken.length) {
          for (let handler of handlers.refreshToken) {
            const result = await handler(payload, request);
            if (result?.payload) {
              return {
                [manifest.authAcquire.refreshTokenKey]: jwt.sign(result.payload, config.refreshTokenSecret, {expiresIn: '90d'}),
                [manifest.authAcquire.accessTokenKey]: jwt.sign(result.payload, config.accessTokenSecret, {expiresIn: '1h'}),
              }
            }
          }
        }
      } catch (err) {
        reply.statusCode = 401;
        return notAuthorized;
      }
      reply.statusCode = 403;
      // will store inside greenpress!
    }
  };
}
