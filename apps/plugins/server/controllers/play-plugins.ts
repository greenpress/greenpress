import Plugin, {IPlugin} from '../models/plugin';

export async function getPluginProxy({tenant, apiPath}): Promise<Pick<IPlugin, 'token' | 'proxyUrl'>> {
  return Plugin.findOne({tenant, apiPath}).select('token proxyUrl').lean();
}
