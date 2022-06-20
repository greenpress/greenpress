import GreenpressSDK from '@greenpress/sdk';

export const {sdk, loadAll} = import.meta.env.SSR
  ? await import('./sdk-server')
  : {
    sdk: new GreenpressSDK({appUrl: location.origin, fetch: globalThis.fetch}),
    loadAll: (kind, {req}) => null,
  }

export default sdk;
