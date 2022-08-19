import {start, registerToHook, addMicroFrontend} from '../src'

registerToHook({source: 'content', path: 'my-hook'}, (request) => {
  console.log(request.tenantPayload, request.headers, request.body);
  return {message: 'king'}
});

addMicroFrontend({
  name: 'custom demo',
  url: 'https://google.com',
  description: 'google it',
  route: {
    name: 'custom-demo',
    path:'custom',
    navBarPosition: 'top',
  },
})

start({
  config: {
    accessTokenSecret: 'demo-secret',
    refreshTokenSecret: 'refresh-token-secret',
    greenpressUrl: 'http://localhost:3000',
    greenpressUsername: 'test@test.com',
    greenpressPassword: 'admin'
  }
});
