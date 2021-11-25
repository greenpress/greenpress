import GreenpressSDK from '@greenpress/sdk'

const appUrl = import.meta.env.SSR ?
  'http://localhost:3000' :
  location.origin


const fetchFn = import.meta.env.SSR ?
  await import('node-fetch') :
  window.fetch

const sdk = new GreenpressSDK({appUrl, fetch: fetchFn})

export default sdk;
