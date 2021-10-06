import {app as getApp} from '@greenpress/api-kit'
import {managePlugins} from './manage-plugins';
import {playPlugins} from './play-plugins';

export async function loadRoutes() {
  const app = getApp()
  app.use(managePlugins());
  app.use(await playPlugins());
}
