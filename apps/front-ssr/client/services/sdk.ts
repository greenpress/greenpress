import * as server from './sdk-server';

export const {sdk, loadAll} = import.meta.env.SSR
  ? server
  : {
    sdk: null,
    loadAll: (kind: string) => null,
  }

export default sdk;
