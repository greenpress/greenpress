import GreenpressAdministratorSDK from '@greenpress/sdk/dist/administrator'

const sdk = new GreenpressAdministratorSDK({
    appUrl: location.origin,
    fetch: globalThis.fetch.bind(globalThis),
})

export default sdk;
