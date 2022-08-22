import {RouteOptions} from 'fastify/types/route';
import jwt from 'jsonwebtoken';
import manifest from './manifest';
import handlers, {StandardPayload} from './handlers';
import config from './config';
import {FastifyRequest} from 'fastify/types/request';
import {getSdk, getSdkForUrl} from './sdk';

declare module 'fastify' {
  interface FastifyRequest {
    tenantPayload: StandardPayload & any;
  }
}

const notAuthorized = {message: 'you are not authorized'};

export function getRefreshTokenRoute(): RouteOptions {

  const usersSdk = getSdk().users;

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

export function getRegisterRoute(): RouteOptions {

  const usersSdk = getSdk().users;

  if (config.greenpressUrl) {
    handlers.newTenant.push(async ({email, password, appUrl}) => {
      const sdk = getSdkForUrl(appUrl)
      const {payload} = await sdk.authentication.oAuthSignin({email, password});
      if (!payload.user?.roles?.includes('plugin')) {
        throw new Error('should retrieve a plugin user to app: ' + appUrl);
      }
      const newPayload: StandardPayload = {
        sub: '',
        identifier: (Date.now() + Math.random()).toString().substring(0, 10)
      }
      const {payload: {user}} = await usersSdk.create({
        firstName: appUrl,
        lastName: 'gp-player-app',
        email,
        password,
        roles: ['user'],
        internalMetadata: {tokenIdentifier: newPayload.identifier}
      });
      newPayload.sub = user._id;
      return newPayload;
    })
  }

  return {
    method: 'POST',
    url: manifest.registerUrl,
    handler: async (request, reply) => {
      const {email, password, appUrl} = request.body || {} as any;
      if (!(email && password && appUrl)) {
        reply.statusCode = 401;
        return notAuthorized;
      }
      try {
        if (handlers.newTenant.length) {
          for (let handler of handlers.newTenant) {
            const result = await handler({email, password, appUrl}, request);
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


export async function verifyAccessToken(req: FastifyRequest): Promise<void> {
  const {authorization} = req.headers;

  const token = authorization?.split(' ')[1];

  if (!token) {
    throw new Error('authorization token was not provided');
  }

  try {
    req.tenantPayload = jwt.verify(token, config.accessTokenSecret);
  } catch {
    throw new Error('authorization token was not valid');
  }
}
