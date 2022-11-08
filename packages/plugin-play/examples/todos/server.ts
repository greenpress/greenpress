import {start, addMicroFrontend, addEndpoint, getSdkForTenant} from '../../src';
import {join} from 'path';

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

addEndpoint('/api/todos', {
  async handler(req) {
    try {
      const sdk = await getSdkForTenant(req.tenantPayload);
      if (!sdk) {
        return ['empty'];
      }
      return sdk.blocks.getList();
    } catch {
      //
    }
    return ['no access']
  }
})

addEndpoint('/api/add-todos', {
  method: 'POST',
  async handler(req) {
    const body: any = req.body || {}
    try {
      const sdk = await getSdkForTenant(req.tenantPayload);
      if (!sdk) {
        return ['empty'];
      }
      await sdk.blocks.create({
        name: body.name,
        content: body.content
      })
    } catch {
      //
    }
    return ['no access']
  }
})


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
