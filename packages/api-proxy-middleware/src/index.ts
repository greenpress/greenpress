import fetch from "node-fetch";
import { createProxyMiddleware as proxy } from "http-proxy-middleware";
import { IApiProxyConfig, IServiceProxyConfig } from "./types";
import { getApiProxyConfig } from "./config";

function getProxy(target: string) {
  return proxy({
    target,
    changeOrigin: true,
  });
}

function getProxyTarget(service: IServiceProxyConfig) {
  return `${service.protocol}://${service.url}:${service.port}`;
}

export function apiProxy(app: any, config: Partial<IApiProxyConfig>, cacheManager) {
  const {
    authService,
    contentService,
    adminPanel,
    assetsService,
    draftsService,
    frontService,
    tenant,
    applicationUrl,
    excludedServices,
  } = { ...getApiProxyConfig(), ...config };

  function useProxy(app, service: IServiceProxyConfig) {
    if (excludedServices.includes(service.name)) {
      console.log("excluding proxy to " + service.name);
      return;
    }
    app.use(service.proxies, getProxy(getProxyTarget(service)));
  }

  const meUrl = getProxyTarget(authService) + "/api/me";
  const hostTenantUrl = getProxyTarget(contentService) + "/internal-api/host-tenant";

  function getTenantByHost(hostUrl: string) {
    return cacheManager.wrap("host-tenant:" + hostUrl, () => {
      return fetch(hostTenantUrl + "?host=" + hostUrl)
        .then((res) => res.json())
        .then((data) => data.tenant);
    });
  }

  app.use(
    [...authService.proxies, ...contentService.proxies, ...assetsService.proxies, ...draftsService.proxies],
    require("cors")(async (req, callback) => {
      try {
        const host = req.header("Origin");
        if (host === applicationUrl) {
          req.headers.tenant = tenant;
        } else {
          req.headers.tenant = await getTenantByHost(host);
        }
        if (!req.headers.tenant) {
          throw new Error("no tenant for request url");
        }
        callback({ credentials: true });
      } catch {
        callback(null, { origin: true, credentials: true });
      }
    })
  );

  app.use([...contentService.proxies, ...assetsService.proxies, ...draftsService.proxies], (req, res, next) => {
    if (!(req.headers.authorization || (req.headers.cookie && req.headers.cookie.includes("token=")))) {
      next();
      return;
    }
    fetch(meUrl, {
      headers: {
        "Content-Type": "application/json",
        tenant,
        cookie: req.headers.cookie,
        authorization: req.headers.authorization,
      },
    })
      .then((response) => {
        const setCookie = response.headers.raw()["set-cookie"];
        if (setCookie) {
          res.set("set-cookie", setCookie);
        }
        if (response.status === 200) {
          return response.text();
        }
      })
      .then((user = "") => {
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
}
