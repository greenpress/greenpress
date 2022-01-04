import {getRouter} from '@greenpress/api-kit/dist/router';
import {verifyUser, populateUser} from '@greenpress/api-kit/dist/user-middlewares'
import {createPlugin, getAllPlugins, getPlugin, removePlugin, updatePlugin} from '../controllers/manage-plugins';
import onlyPrivileged from '../middlewares/privileged-check';

export function managePlugins() {
  const router = getRouter();

  const AUTHENTICATION_MIDDLEWARES = [populateUser, verifyUser, onlyPrivileged]

  router
    .route('/api/plugins')
    .get(getAllPlugins, AUTHENTICATION_MIDDLEWARES)
    .post(createPlugin, AUTHENTICATION_MIDDLEWARES);

  router
    .route('/api/plugins/:pluginId')
    .get(getPlugin, AUTHENTICATION_MIDDLEWARES)
    .put(updatePlugin, AUTHENTICATION_MIDDLEWARES)
    .delete(removePlugin, AUTHENTICATION_MIDDLEWARES);

  return router;
}
