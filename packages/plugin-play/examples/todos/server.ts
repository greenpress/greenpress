import {start, registerToHook, addMicroFrontend, getSdkForTenant} from '../../src';
import {join} from "path";

addMicroFrontend({
  name: 'Todos',
  url: 'index.html',
  description: 'Todos List',
  route: {
    name: 'Todos',
    path: 'todos',
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
    staticFrontend: {
      root: join(__dirname, 'public'),
      prefix: '/'
    }
  },
});
