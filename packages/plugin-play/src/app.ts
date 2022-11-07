import {existsSync} from 'fs';
import {join} from 'path';
import fastify, {FastifyInstance} from 'fastify';
import {RouteHandlerMethod} from 'fastify/types/route';
import type {FastifyCookieOptions} from '@fastify/cookie'
import cookie from '@fastify/cookie'
import {manifest, ManifestOptions} from './manifest';
import config, {ConfigOptions, setConfig} from './config';
import {
  getCallbackRoute,
  getFrontendAuthorizationRoute,
  getRefreshTokenRoute,
  getRegisterRoute,
  verifyAccessToken, verifyCookieToken
} from './authentication';
import handlers from './handlers';
import {endpoints} from './endpoints';

const hooks = new Set<{ subscribedEvent, path, handler }>();

let app: FastifyInstance;

export async function start(options?: { manifest?: ManifestOptions, config?: ConfigOptions }) {
  configure(options?.manifest || {}, options?.config || {});

  const app = getApp();
  try {
    console.log('start application for environment: ', config.dev ? 'development' : 'production');
    await app.listen({port: Number(config.port), host: config.host})
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

export function configure(manifestOptions: ManifestOptions, appConfig: ConfigOptions) {
  Object.assign(manifest, manifestOptions);
  setConfig(appConfig);

  if (config.dev && !manifest.appUrl) {
    manifest.appUrl = 'http://' + config.host + ':' + config.port;
  }
  manifest.proxyUrl = new URL(manifest.proxyPath, manifest.appUrl).href;
}

export function getApp(): FastifyInstance {
  return app || createApp();
}

export function registerToHook(hook: { source?: string, kind?: string, eventName?: string, path?: string }, handler: RouteHandlerMethod) {
  hook.path = hook.path || btoa(JSON.stringify(hook));
  const subscribedEvent = {
    source: hook.source || '*',
    kind: hook.kind || '*',
    eventName: hook.eventName || '*',
  };
  hooks.add({
    subscribedEvent,
    path: hook.path,
    handler
  });
  manifest.subscribedEvents.push(subscribedEvent);
}

function createApp(): FastifyInstance {
  app = fastify(config.dev ? {logger: true} : {});

  app.addContentTypeParser('application/json', {parseAs: 'string'}, function (req, body, done) {
    try {
      const bodyStr = body.toString() as string;
      done(null, bodyStr ? JSON.parse(bodyStr) : {})
    } catch (err) {
      err.statusCode = 400
      done(err, undefined)
    }
  });

  app.route(getRefreshTokenRoute());
  app.route(getRegisterRoute());
  app.route(getCallbackRoute());
  playManifest();
  playHooks();
  playEndpoints();
  playFrontend();

  if (!(config.greenpressUrl || handlers.refreshToken.length)) {
    throw new Error('you must provide either a refresh token handler or Greenpress application credentials');
  }

  return app;
}

function playManifest() {
  getApp().route({
    method: 'GET',
    url: manifest.manifestUrl,
    handler({headers, body}, res) {
      setImmediate(() => handlers.manifest.forEach(cb => cb({headers, body})));
      res.header('Access-Control-Allow-Origin', '*');
      return manifest;
    }
  })
  console.log('manifest URL: ' + new URL(manifest.manifestUrl, manifest.appUrl).href)
}

function playHooks() {
  hooks.forEach(hook => {
    const routePath = join('/api/hooks', hook.path);
    hook.subscribedEvent.hookUrl = new URL(routePath, manifest.appUrl).href;
    getApp().route({
      method: 'POST',
      url: routePath,
      preHandler: verifyAccessToken,
      handler: hook.handler
    })
    console.log('subscribed event configured: ', routePath, hook.subscribedEvent);
  })
}

function playFrontend() {
  if (existsSync(config.staticFrontend.root)) {
    getApp().register(require('@fastify/static'), config.staticFrontend);
  }
}

function playEndpoints() {
  if (!endpoints.size) {
    return;
  }
  getApp().register(cookie, {} as FastifyCookieOptions);
  getApp().route(getFrontendAuthorizationRoute());
  endpoints.forEach((routeOptions, path) => {
    getApp().route({
      ...routeOptions,
      preHandler: path.startsWith(manifest.apiPath) ? verifyAccessToken : verifyCookieToken
    });
  })
}