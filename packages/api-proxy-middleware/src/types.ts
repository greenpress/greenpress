export interface IServiceProxyConfig {
  name: string;
  protocol: string;
  url: string;
  port: string | number;
  proxies: Array<string>;
}

export interface IApiProxyConfig {
  tenant: string;
  applicationUrl: string;
  internalUrl: string;
  excludedServices: Array<string>;
  contentService: IServiceProxyConfig;
  authService: IServiceProxyConfig;
  assetsService: IServiceProxyConfig;
  adminPanel: IServiceProxyConfig;
  draftsService: IServiceProxyConfig;
  frontService: IServiceProxyConfig;
  pluginsService: IServiceProxyConfig;
}
