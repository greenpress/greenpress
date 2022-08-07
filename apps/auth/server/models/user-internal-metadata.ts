import mongoose, {Schema} from 'mongoose';

const UserInternalMetadataSchema = new mongoose.Schema({
  tenant: {
    type: String,
    index: true,
    default: '0',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  metadata: Schema.Types.Mixed
});

UserInternalMetadataSchema.index({tenant: 1, user: 1}, {unique: true});

const UserInternalMetadata = mongoose.model<{ metadata?: any }>('UserInternalMetadata', UserInternalMetadataSchema);
export default UserInternalMetadata

