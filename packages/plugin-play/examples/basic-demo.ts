import {start, registerToHook} from '../src'

registerToHook({source: 'content', path: 'my-hook'}, () => {
  return {message: 'king'}
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
