import {getRouter} from '@greenpress/api-kit/dist/router';
import {verifyUser, populateUser} from '@greenpress/api-kit/dist/user-middlewares'
import {createPlugin, getAllPlugins, getPlugin, removePlugin, updatePlugin} from '../controllers/manage-plugins';
import onlyPrivileged from '../middlewares/privileged-check';

export function managePlugins() {
  const router = getRouter();

  const AUTHENTICATION_MIDDLEWARES = [populateUser, verifyUser, onlyPrivileged]

  router
    .route('/api/plugins')
    .use(AUTHENTICATION_MIDDLEWARES)
    .get(getAllPlugins)
    .post(createPlugin);

  router
    .route('/api/plugins/:pluginId')
    .use(AUTHENTICATION_MIDDLEWARES)
    .get(getPlugin)
    .put(updatePlugin)
    .delete(removePlugin);

  return router;
}
