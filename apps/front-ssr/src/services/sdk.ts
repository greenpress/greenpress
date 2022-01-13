import GreenpressSDK from '@greenpress/sdk'

const appUrl = import.meta.env.SSR ?
  'http://localhost:3000' :
  location.origin

const fetchFn = globalThis.fetch;

const sdk = new GreenpressSDK({ appUrl, fetch: fetchFn })

export const loadLayoutPayload = import.meta.env.SSR ? (kind: string) => {
  return sdk.layouts.getLayout(kind as any).then(layout => {
    return {
      layout: layout.content,
      connectedData: layout.connectedData || []
    }
  })
} : true;

export default sdk;
