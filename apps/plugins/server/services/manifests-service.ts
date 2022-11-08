import crypto from 'crypto';
import fetch from 'node-fetch';
import {IPlugin} from '../models/plugin';
import {createUser, getUsers, updateUser} from './users';
import {storeOAuthPayloadForPlugin} from './tokens-management';
import httpAgent from './http-agent';

type PluginEnrichOptions = {
  hardReset?: boolean,
  tenant: string,
  host: string,
  appUrl: string
}

function getRandomHash() {
  const currentDate = new Date().valueOf().toString()
  const random = Math.random().toString()
  return crypto.createHash('sha1').update(currentDate + random).digest('hex');
}

export async function loadManifest(manifestUrl: string): Promise<IPlugin & { registerUrl?: string, appUrl?: string }> {
  const res = await fetch(manifestUrl, {
    agent: httpAgent,
  });
  const manifest = await res.json();

  const appUrl = manifest.appUrl;
  if (!appUrl) {
    return manifest;
  }

  return {
    ...manifest,
    manifestUrl: (new URL(manifest.manifestUrl, appUrl)).href,
    registerUrl: (new URL(manifest.registerUrl, appUrl)).href,
    callbackUrl: (new URL(manifest.callbackUrl, appUrl)).href,
    authAcquire: {
      ...manifest.authAcquire,
      refreshTokenUrl: (new URL(manifest.authAcquire.refreshTokenUrl, appUrl)).href,
    }
  };
}

async function registerToPlugin(plugin: IPlugin, registerUrl: string, {tenant, host, appUrl}) {
  const email = `${plugin._id}.${tenant}@${host}`;
  const password = getRandomHash();
  const [maybeUser] = await getUsers(tenant, {email});
  const metadataToStore = {
    email,
    password,
    roles: ['plugin'],
    firstName: plugin.name
  };
  const user = maybeUser ?
    await updateUser(plugin.tenant, maybeUser._id, metadataToStore) :
    await createUser(plugin.tenant, metadataToStore);
  plugin.user = user._id;
  const res = await fetch(registerUrl, {
    method: 'POST',
    body: JSON.stringify({email, password, appUrl}),
    agent: httpAgent,
    headers: {
      'x-tenant': tenant,
      'x-from': 'greenpress',
      'Content-Type': 'application/json',
    }
  })
  const payload = await res.json();

  storeOAuthPayloadForPlugin(tenant, plugin.apiPath, payload, plugin.authAcquire);
}

export async function enrichPluginWithManifest(plugin: IPlugin, {
  hardReset = false,
  tenant,
  host,
  appUrl
}: PluginEnrichOptions) {
  if (!plugin.manifestUrl) {
    return plugin;
  }
  const manifest = await loadManifest(plugin.manifestUrl);
  const authAcquire = manifest.authAcquire;
  if (authAcquire) {
    plugin.authAcquire.refreshTokenUrl = authAcquire.refreshTokenUrl || plugin.authAcquire.refreshTokenUrl;
    plugin.authAcquire.accessTokenKey = authAcquire.accessTokenKey || plugin.authAcquire.accessTokenKey;
    plugin.authAcquire.refreshTokenKey = authAcquire.refreshTokenKey || plugin.authAcquire.refreshTokenKey;
  }
  plugin.name = manifest.name || plugin.name;
  plugin.description = manifest.description || plugin.description;
  plugin.microFrontends = manifest.microFrontends.map(mfe => {
    return {
      ...mfe,
      url: mfe.url.startsWith('http') ? mfe.url : new URL(mfe.url, manifest.appUrl).href,
    }
  });

  if (hardReset) {
    plugin.apiPath = manifest.apiPath;
    plugin.proxyUrl = manifest.proxyUrl;
    plugin.callbackUrl = manifest.callbackUrl;
    plugin.subscribedEvents = manifest.subscribedEvents;
    if (manifest.registerUrl) {
      plugin.encodePath();
      await registerToPlugin(plugin, manifest.registerUrl, {tenant, host, appUrl});
    }
  }
  return plugin;
}
