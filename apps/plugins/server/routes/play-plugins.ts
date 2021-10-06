import {getRouter} from '@greenpress/api-kit/router';
import {getPlugins} from '../controllers/play-plugins';
import {createProxyMiddleware} from 'http-proxy-middleware';
import {proxyApiPrefix} from '../../config';


export async function playPlugins() {
  const plugins = await getPlugins();
  const router = getRouter();

  plugins.forEach(plugin => {
    router.use(proxyApiPrefix + '/' + plugin.apiPath, createProxyMiddleware({
      target: plugin.proxyUrl,
      changeOrigin: true,
      headers: {
        token: plugin.token,
      }
    }))
  });

  return router;
}
