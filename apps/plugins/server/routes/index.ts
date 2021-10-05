import {app as getApp} from '@greenpress/api-kit'
import {managePlugins} from './manage-plugins';
import {playPlugins} from './play-plugins';

const app = getApp()
app.use(managePlugins());
app.use(playPlugins());
