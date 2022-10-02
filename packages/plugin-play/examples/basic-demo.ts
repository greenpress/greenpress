import {start, registerToHook, addMicroFrontend, getSdkForTenant} from '../src';

registerToHook({source: 'content', path: 'my-hook'}, async (request) => {
  console.log('yay')
  console.log(request.body);
  const sdk = await getSdkForTenant(request.tenantPayload);

  console.log(await sdk.blocks.getList());

  return {message: 'king'};
});

addMicroFrontend({
  name: 'league',
  url: 'https://www.monkeyleague.io/#team',
  description: 'google it',
  route: {
    name: 'custom-demo',
    path: 'league',
    navBarPosition: 'top',
  },
});

addMicroFrontend({
  name: 'David',
  url: 'https://www.davidlevy.co.il/wallak/vue-react-rectivity',
  description: 'tweet it',
  route: {
    name: 'davidlevy',
    path: 'davidlevy',
    navBarPosition: 'top',
  },
});

start({
  config: {
    accessTokenSecret: 'demo-secret',
    refreshTokenSecret: 'refresh-token-secret',
    greenpressUrl: 'http://localhost:3000',
    greenpressUsername: 'test@test.com',
    greenpressPassword: 'admin',
  },
});
