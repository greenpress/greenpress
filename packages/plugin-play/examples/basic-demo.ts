import {start, registerToHook} from '../src'

registerToHook({source: 'content', path: 'my-hook'}, (request) => {
  console.log(request.headers, request.body);
  return {message: 'king'}
});

start({
  config: {
    accessTokenSecret: 'demo-secret',
    refreshTokenSecret: 'refresh-token-secret',
    greenpressUrl: 'http://localhost:3000',
    greenpressUsername: 'test@test.com',
    greenpressPassword: 'admin'
  }
});
