import {getRouter, verifyUser, populateUser} from '@greenpress/api-kit';
import {createPlugin, getAllPlugins, getPlugin, removePlugin, updatePlugin} from '../controllers/manage-plugins';
import onlyPrivileged from '../middlewares/privileged-check';

export function managePlugins() {
  const router = getRouter();

  const AUTHENTICATION_MIDDLEWARES = [populateUser, verifyUser, onlyPrivileged]

  router
    .get('/api/plugins', AUTHENTICATION_MIDDLEWARES.concat(getAllPlugins))
    .post('/api/plugins', AUTHENTICATION_MIDDLEWARES.concat(createPlugin))

  router
    .get('/api/plugins/:pluginId', AUTHENTICATION_MIDDLEWARES.concat(getPlugin))
    .put('/api/plugins/:pluginId', AUTHENTICATION_MIDDLEWARES.concat(updatePlugin))
    .delete('/api/plugins/:pluginId', AUTHENTICATION_MIDDLEWARES.concat(removePlugin))

  return router;
}
