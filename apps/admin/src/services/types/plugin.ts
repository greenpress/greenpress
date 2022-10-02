export interface IMicroFrontend {
  name: string;
  description: string;
  callbackUrl?: string;
  pluginId?: string;
  url: string;
  active: boolean;
  opened: boolean;
  route?: {
    name: string;
    path: string;
    roles: string[],
    navBarPosition: 'top' | 'bottom';
  };
  component?: {
    page: string;
    position: 'top' | 'left' | 'right' | 'bottom';
  }
}

export interface IPlugin {
  _id: string;
  tenant: string;
  name: string;
  description?: string;
  apiPath: string;
  user: string;
  proxyUrl: string;
  manifestUrl: string;
  callbackUrl?: string;
  authAcquire: {
    refreshTokenUrl: string;
    refreshTokenKey: string;
    accessTokenKey: string;
  };
  auth: {
    refreshTokenIdentifier?: string;
  };
  subscribedEvents: {
    source?: string,
    kind?: string,
    eventName?: string,
    hookUrl: string;
  }[]
  microFrontends: IMicroFrontend[]
}
