import mongoose, {Document} from 'mongoose'

export interface IPlugin extends Document {
  tenant: string;
  name: string;
  description?: string;
  apiPath: string;
  user: string;
  token: string;
  proxyUrl: string;
  authAcquire: {
    refreshTokenUrl: string;
    refreshTokenKey: string;
    accessTokenKey: string;
  };
  auth: {
    refreshTokenIdentifier?: string;
  };
  subscribedEvents: {
    source?: string,
    kind?: string,
    eventName?: string,
    hookUrl: string;
  }[]
  microFrontends: {
    name: string;
    path: string;
    url: string;
  }[]
}

const PluginSchema = new mongoose.Schema<IPlugin>({
  tenant: {
    type: String,
    index: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  apiPath: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true
  },
  authAcquire: {
    refreshTokenUrl: {
      type: String,
      required: true
    },
    refreshTokenKey: {
      type: String,
      required: true,
      default: 'refresh_token'
    },
    accessTokenKey: {
      type: String,
      required: true,
      default: 'access_token'
    }
  },
  auth: {
    refreshTokenIdentifier: String,
  },
  token: String,
  proxyUrl: {
    type: String,
    required: true
  },
  subscribedEvents: [{
    source: String,
    kind: String,
    eventName: String,
    hookUrl: {
      type: String,
      required: true
    }
  }],
  microFrontends: [{
    name: String,
    path: String,
    url: String,
  }]
});

PluginSchema.index({tenant: 1, apiPath: 1}, {unique: true});

const Plugin = mongoose.model<IPlugin>('Plugin', PluginSchema);

export default Plugin;
