import mongoose, {Document} from 'mongoose'

export interface IEvent extends Document {
  tenant: string;
  user?: mongoose.Types.ObjectId;
  source: string;
  kind: string;
  eventName: string;
  description: string;
  metadata: any;
  created: Date;
}

const EventSchema = new mongoose.Schema<IEvent>({
  tenant: {
    type: String,
    index: true,
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
  },
  source: {
    type: String,
    required: true
  },
  kind: {
    type: String,
    required: true
  },
  eventName: {
    type: String,
    required: true
  },
  description: String,
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  created: {
    type: Date,
    default: Date.now,
  }
});

EventSchema.index({tenant: 1, apiPath: 1}, {unique: true});

const PlatformEvent = mongoose.model<IEvent>('Event', EventSchema);

export default PlatformEvent;
