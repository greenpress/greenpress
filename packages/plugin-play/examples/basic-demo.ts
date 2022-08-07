import {start, registerToHook} from '../src'

registerToHook({source: 'content', path: 'my-hook'}, () => {
  return {message: 'king'}
})

start({
  config: {
    accessTokenSecret: 'demo-secret',
    refreshTokenSecret: 'refresh-token-secret'
  }
});
