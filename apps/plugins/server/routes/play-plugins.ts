import {getRouter} from '@greenpress/api-kit';
import {getPluginProxy} from '../controllers/play-plugins';
import {createProxyMiddleware} from 'http-proxy-middleware';
import {proxyApiPrefix} from '../../config';
import {IPlugin} from '../models/plugin';

declare module 'express' {
  interface Request {
    plugin: Pick<IPlugin, 'token' | 'proxyUrl'>;
    pluginUrl: string;
  }
}

export async function playPlugins() {
  const router = getRouter();

  async function loadPluginRequest(req, res, next) {
    const [apiPath, ...theRest] = req.originalUrl.slice(req.originalUrl.indexOf(proxyApiPrefix) + proxyApiPrefix.length).split('/')[0];
    const targetSuffix = theRest.join('/');
    const plugin = await getPluginProxy({tenant: req.headers.tenant, apiPath});

    if (!plugin) {
      res.status(401).json({message: 'plugin not exist'});
      return;
    }

    req.plugin = plugin;
    req.pluginUrl = `${plugin.proxyUrl}/${targetSuffix}`;
    next();
  }

  router.use(proxyApiPrefix, loadPluginRequest, createProxyMiddleware({
    changeOrigin: true,
    router(req) {
      return req.pluginUrl;
    },
    onProxyReq(proxyReq, req) {
      proxyReq.removeHeader('cookie');
      proxyReq.setHeader('Authorization', 'Bearer ' + req.plugin.token);
    }
  }))

  return router;
}
