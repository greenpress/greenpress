import GreenpressSDK from '@greenpress/sdk'

const sdk = new GreenpressSDK({
    appUrl: location.origin,
    fetch: globalThis.fetch.bind(globalThis),
})

export default sdk;
