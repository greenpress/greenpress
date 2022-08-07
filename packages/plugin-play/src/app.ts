import fastify, {FastifyInstance} from 'fastify';
import {join} from 'path';
import {RouteHandlerMethod} from 'fastify/types/route';
import {manifest, ManifestOptions} from './manifest';
import config, {ConfigOptions, setConfig} from './config';
import {getRefreshTokenRoute} from './authentication';

const hooks = new Set<{ subscribedEvent, path, handler }>();

let app: FastifyInstance;

export async function start(options?: { manifest?: ManifestOptions, config?: ConfigOptions }) {
  configure(options?.manifest || {}, options?.config || {});

  const app = getApp();
  try {
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

function createApp(): FastifyInstance {
  app = fastify(config.dev ? {logger: true} : {});

  app.addContentTypeParser('application/json', {parseAs: 'string'}, function (req, body, done) {
    try {
      done(null, JSON.parse(body.toString() as string))
    } catch (err) {
      err.statusCode = 400
      done(err, undefined)
    }
  });

  app.route(getRefreshTokenRoute());
  playManifest();
  playHooks();

  return app;
}

function playManifest() {
  getApp().route({
    method: 'GET',
    url: manifest.manifestUrl,
    handler() {
      return manifest;
    }
  })
}

function playHooks() {
  hooks.forEach(hook => {
    const routePath = join('/api/hooks', hook.path);
    hook.subscribedEvent.hookUrl = new URL(routePath, manifest.appUrl).href;
    getApp().route({
      method: 'POST',
      url: routePath,
      handler: hook.handler
    })
    console.log('subscribed event configured: ', hook.subscribedEvent);
  })
}

export function registerToHook(hook: { source?: string, kind?: string, eventName?: string, path: string }, handler: RouteHandlerMethod) {
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
