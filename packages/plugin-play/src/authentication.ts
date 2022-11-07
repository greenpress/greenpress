import jwt from 'jsonwebtoken';
import {RouteOptions} from 'fastify/types/route';
import {FastifyRequest} from 'fastify/types/request';
import manifest from './manifest';
import handlers, {onCallback, onFrontendAuthorization, onNewTenant, onRefreshToken, StandardPayload} from './handlers';
import config from './config';
import {getSdk, getSdkForUrl} from './sdk';

declare module 'fastify' {
  interface FastifyRequest {
    tenantPayload: StandardPayload & any;
    user?: { email, firstName, lastName }
  }
}

const notAuthorized = {message: 'you are not authorized'};

function getHostname(fullUrl: string) {
  const url = new URL(fullUrl);
  return url.hostname;
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

export async function verifyCookieToken(req: FastifyRequest): Promise<void> {
  const {code} = req.headers;
  if (!code) {
    throw new Error('authorization code was not provided');
  }
  const token = req.cookies?.['token_' + code];

  if (!token) {
    throw new Error('user is not authorized');
  }

  try {
    req.tenantPayload = jwt.verify(token, config.accessTokenSecret);
  } catch {
    throw new Error('authorization token was not valid');
  }
}

export function getRefreshTokenRoute(): RouteOptions {

  const usersSdk = getSdk().users;

  if (config.greenpressUrl) {
    onRefreshToken(async ({sub, identifier = ''}) => {
      const user = await usersSdk.getUser(sub);
      console.log('user for refresh token', identifier, user)
      if (identifier.toString() !== user.internalMetadata?.tokenIdentifier) {
        throw new Error('user is not verified on greenpress BaaS')
      }
      const newPayload: StandardPayload = {
        sub,
        identifier: (Date.now() + Math.random()).toString().substring(0, 10)
      }
      await usersSdk.update(sub, {internalMetadata: {tokenIdentifier: newPayload.identifier}})
      return {payload: newPayload};
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
      console.log('refresh token accepted', expectedRefreshToken)
      let payload: StandardPayload;
      try {
        payload = jwt.verify(expectedRefreshToken, config.refreshTokenSecret);
        if (handlers.refreshToken.length) {
          for (let handler of handlers.refreshToken) {
            const result = await handler(payload, request);
            console.log('payload for new token', result)
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
    onNewTenant(async ({email, password, appUrl}) => {
      const tenantSdk = getSdkForUrl(appUrl)
      const emailSplit = email.split('@');
      if (emailSplit.length === 2 && getHostname(appUrl) !== emailSplit[1].split(':')[0]) {
        throw new Error('email must be provided from the same app url');
      }
      // email will be: {pluginId}.{tenantId}@${tenantHostname}
      const {payload} = await tenantSdk.authentication.oAuthSignin({email, password});
      if (!payload.user?.roles?.includes('plugin')) {
        throw new Error('should retrieve a plugin user to app: ' + appUrl);
      }
      const newPayload: StandardPayload = {
        sub: '',
        identifier: (Date.now() + Math.random()).toString().substring(0, 10)
      }
      const [existingUser] = await usersSdk.getList({email, exact: true});
      let user;
      if (existingUser) {
        user = existingUser;
        await usersSdk.update(user._id, {
          firstName: appUrl,
          lastName: 'gp-player-app',
          email,
          password,
          internalMetadata: {tokenIdentifier: newPayload.identifier}
        });
      } else {
        user = await usersSdk.create({
          firstName: appUrl,
          lastName: 'gp-player-app',
          email,
          password,
          roles: ['user'],
          internalMetadata: {tokenIdentifier: newPayload.identifier}
        });
      }

      await usersSdk.setEncryptedData(user._id, {
        appUrl,
        email,
        password,
        currentAuthPayload: payload
      })
      newPayload.sub = user._id;
      return {payload: newPayload};
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

export function getCallbackRoute(): RouteOptions {
  if (config.greenpressUrl) {
    onCallback(async ({user, returnUrl}, request) => {
      const code = Math.floor(Math.random() * 1000).toString();
      // set the code on gp db
      // temporary set the data as drafts
      // TODO: add callback code-based endpoint in auth service
      await getSdk().drafts.setDraft({
        contextType: returnUrl,
        contextId: `${request.tenantPayload.sub}.${user.email}`,
        contextData: {
          code,
          user,
          created: Date.now(),
          tenant: request.tenantPayload
        }
      })
      return code;
    });
  }

  return {
    method: 'GET',
    url: manifest.callbackUrl,
    preHandler: verifyAccessToken,
    handler: async (request, reply) => {
      const queryParams: any = request.query || {};

      try {
        const returnUrl = new URL(queryParams.returnUrl);
        const user = request.headers.user ? JSON.parse(request.headers.user as string) : undefined;
        request.user = user;

        for (let handler of handlers.callback) {
          const code = await handler({user, returnUrl: returnUrl.href}, request)

          if (code && typeof code === 'string') {
            returnUrl.searchParams.append('code', code);
            returnUrl.searchParams.append('token', jwt.sign({
              user,
              tenant: request.tenantPayload
            }, config.accessTokenSecret, {expiresIn: '10min'}));

            return {
              returnUrl: returnUrl.href
            }
          }
        }
      } catch (err) {
        if (config.dev) {
          console.log('error in callback', err);
        }
      }
      reply.statusCode = 401;
      return notAuthorized;
    }
  }
}

export function getFrontendAuthorizationRoute(): RouteOptions {
  if (config.greenpressUrl) {
    onFrontendAuthorization(async ({returnUrl, user, tenant}, request) => {
      const draft = await getSdk().drafts.getDraft(returnUrl, `${tenant.sub}.${user.email}`);
      if (draft && draft.contextData) {
        return {
          code: draft.contextData.code,
          token: jwt.sign({code: draft.contextData, user, tenant}, config.accessTokenSecret, {expiresIn: '10min'}),
        }
      }
      return;
    });
  }

  return {
    method: 'POST',
    url: manifest.authorizeUrl,
    handler: async (request, reply) => {
      const {returnUrl, token}: any = request.body || {};

      try {
        const {user, tenant} = jwt.verify(token, config.accessTokenSecret);
        for (let handler of handlers.frontendAuth) {
          const cookieData = await handler({returnUrl, user, tenant}, request);

          if (cookieData && cookieData.code && cookieData.token) {
            reply.setCookie('token_' + cookieData.code, cookieData.token);
            return {
              user,
              tenant
            }
          }
        }
      } catch (err) {
        if (config.dev) {
          console.log('error in callback', err);
        }
      }
      reply.statusCode = 401;
      return notAuthorized;
    }
  }
}
