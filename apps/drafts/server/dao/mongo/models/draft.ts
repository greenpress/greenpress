import mongoose, {Document} from 'mongoose';

export interface IDraft extends Document {
  user: string;
  tenant: string;
  contextType: string;
  contextDisplayName?: string;
  contextRouteParams?: any;
  contextId: string | null;
  contextData: any;
}

const DraftSchema = new mongoose.Schema<IDraft>({
  user: {
    type: String,
    required: true,
  },
  tenant: {
    type: String,
    required: true,
  },
  contextDisplayName: String,
  contextRouteParams: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  contextType: {
    type: String,
    required: true,
  },
  contextId: {
    type: String,
    required: function () {
      // @ts-ignore
      return this.contextId != null && typeof this.contextId !== 'string';
    },
  },
  contextData: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
});

// @ts-ignore
export default mongoose.model<IDraft>('Draft', DraftSchema);
