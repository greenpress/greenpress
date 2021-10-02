import mongoose, {Document} from 'mongoose'

export interface IPlugin extends Document {
  tenant: string;
  name: string;
  description?: string;
  path: string;
  user: string;
  token: string;
  proxyUrl: string;
  microFrontends: [{
    name: string;
    path: string;
    url: string;
  }]
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
    required: true
  },
  user: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  proxyUrl: {
    type: String,
    required: true
  },
  microFrontends: [{
    name: String,
    path: String,
    url: String,
  }]
})

export default mongoose.model<IPlugin>('Plugin', PluginSchema)
