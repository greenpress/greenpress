import * as Ctrl from '../controllers/providers';

export default (app) => {
  app
    .get('/api/mailing/providers', Ctrl.getProvidersList)
    .post('/api/mailing/providers', Ctrl.createProvider)
    .get('/api/mailing/providers/:providerId', Ctrl.getProviderById, Ctrl.getProvider)
    .put('/api/mailing/providers/:providerId', Ctrl.getProviderById, Ctrl.updateProvider)
    .delete('/api/mailing/providers/:providerId', Ctrl.getProviderById, Ctrl.removeProvider)
}
