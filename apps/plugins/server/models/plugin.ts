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
    description: string;
    url: string;
    active: boolean;
    opened: boolean;
    route?: {
      name: string;
      path: string;
      roles: string[],
      navBarPosition: 'top' | 'bottom';
    };
    component?: {
      page: string;
      position: 'top' | 'left' | 'right' | 'bottom';
    }
  }[]
}

const MicroFrontendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  active: {
    type: Boolean,
    default: true,
  },
  opened: {
    type: Boolean,
    default: true,
  },
  url: {
    type: String,
    required: true
  },
  route: {
    name: String,
    path: String,
    roles: {
      type: [String],
      default: ['*']
    },
    navBarPosition: {
      type: String,
      enum: ['top', 'bottom'],
      default: 'bottom'
    },
  },
  component: {
    page: String,
    position: {
      type: String,
      enum: ['top', 'left', 'right', 'bottom']
    }
  }
})

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
  microFrontends: [MicroFrontendSchema]
});

PluginSchema.index({tenant: 1, apiPath: 1}, {unique: true});

const Plugin = mongoose.model<IPlugin>('Plugin', PluginSchema);

export default Plugin;
