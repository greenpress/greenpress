import {getRouter} from '@greenpress/api-kit/router';
import {verifyUser, populateUser} from '@greenpress/api-kit/user-middlewares'
import {createPlugin, getAllPlugins, getPlugin, removePlugin, updatePlugin} from '../controllers/manage-plugins';
import onlyPrivileged from '../middlewares/privileged-check';

export function managePlugins() {
  const router = getRouter();
  router
    .route('/api/plugins')
    .use(populateUser, verifyUser, onlyPrivileged)
    .get(getAllPlugins)
    .post(createPlugin)

  router
    .route('/api/plugins/:pluginId')
    .use(populateUser, verifyUser, onlyPrivileged)
    .get(getPlugin)
    .put(updatePlugin)
    .delete(removePlugin);

  return router;
}
