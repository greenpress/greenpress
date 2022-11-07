import {join} from 'path';
import manifest from './manifest';
import {RouteHandlerMethod} from 'fastify/types/route';

export interface MicroFrontend {
  name: string;
  description: string;
  url: string;
  route?: {
    name: string;
    path: string;
    roles?: string[],
    navBarPosition: 'top' | 'bottom';
  };
  component?: {
    page: string;
    position: 'top' | 'left' | 'right' | 'bottom';
  }
}

export {start, configure, registerToHook} from './app';
export {onRefreshToken, onManifest, onStoreUser, onNewTenant, onCallback} from './handlers';
export {addEndpoint, addProxyEndpoint} from './endpoints'
export {getSdkForTenant, getSdk, getSdkForUrl} from './sdk';

export function addMicroFrontend(mfe: MicroFrontend) {
  manifest.microFrontends.push(mfe);
}
