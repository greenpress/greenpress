

export interface IPluginProxy {
  name: string;
  apiPath: string;
  token: string;
  proxyUrl: string;
}


const plugins: IPluginProxy[] = [];

export async function getPlugins() {
  return plugins;
}
