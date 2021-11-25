import fetch from 'node-fetch';
import {createProxyMiddleware as proxy} from 'http-proxy-middleware'
import {IApiProxyConfig, IServiceProxyConfig} from './types';
import {getApiProxyConfig} from './config';

function getPureHostname(url: string) {
  const hostname = new URL(url).hostname;
  const hostArray = hostname.split('.');
  return hostArray[0] === 'www' ? hostArray.slice(1).join('.') : hostname;
}

function getProxy(target: string, tenant: string) {
  return proxy({
    target,
    changeOrigin: true,
    headers: {
      tenant,
    },
  });
}

function getProxyTarget(service: IServiceProxyConfig) {
  return `${service.protocol}://${service.url}:${service.port}`;
}

module.exports = function apiProxy(app: any, config: Partial<IApiProxyConfig>) {
  const {
    authService,
    contentService,
    adminPanel,
    assetsService,
    draftsService,
    tenant,
    applicationUrl,
    frontService,
    excludedServices
  } = { ...getApiProxyConfig(), ...config }

  const APP_HOSTNAME = applicationUrl ? getPureHostname(applicationUrl) : null;

  function useProxy(app, service: IServiceProxyConfig) {
    if (excludedServices.includes(service.name)) {
      return;
    }
    app.use(service.proxies, getProxy(getProxyTarget(service), tenant));
  }

  const meUrl = getProxyTarget(authService) + '/api/me';

  if (APP_HOSTNAME) {
    app.use(
      [...authService.proxies, ...contentService.proxies, ...assetsService.proxies, ...draftsService.proxies],
      require('cors')({ origin: new RegExp(APP_HOSTNAME, 'i'), credentials: true })
    );
  }

  app.use([...contentService.proxies, ...assetsService.proxies, ...draftsService.proxies], (req, res, next) => {
    if (!(req.headers.authorization || (req.headers.cookie && req.headers.cookie.includes('token=')))) {
      next();
      return;
    }
    fetch(meUrl, {
      headers: {
        'Content-Type': 'application/json',
        tenant,
        cookie: req.headers.cookie,
        authorization: req.headers.authorization,
      },
    })
      .then((response) => {
        const setCookie = response.headers.raw()['set-cookie'];
        if (setCookie) {
          res.set('set-cookie', setCookie);
        }
        if (response.status === 200) {
          return response.text();
        }
      })
      .then((user = '') => {
        req.headers.user = user;
        next();
      })
      .catch(() => {
        next();
      });
  });

  useProxy(app, authService);
  useProxy(app, contentService);
  useProxy(app, draftsService);
  useProxy(app, assetsService);
  useProxy(app, adminPanel);
  useProxy(app, frontService);
};
