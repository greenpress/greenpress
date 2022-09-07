import mongoose, {ObjectId, Document, Model} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as config from '../../config';
import {getSignedToken, getUniqueId} from '../services/tokens';
import {cacheManager} from '../services/cache-manager';

export interface IUser {
  tenant: string;
  email: string;
  password: string;
  fullName: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  salt: string;
  roles: string[];
  tokens: any[];
}

export interface UserDocument extends IUser, Document {
}

export interface UserModel extends Model<UserDocument> {
  comparePassword(
    password: string,
    callback: (err: Error, success: boolean) => void
  ): void;

  getToken(authType: string, expiresIn?: string): any;

  getRefreshToken(relatedToken: string): any;

  updateToken(
    authType: string,
    currentIdentifier: string,
    newIdentifier: string,
    relatedToken?: string
  ): Promise<UserDocument>;

  deleteToken(authType: string, tokenIdentifier: string): Promise<UserDocument>;

  getTokenByRelatedTokens(authType: string, tokenIdentifier: string): string;

  getUsersList(tenant: string, usersIds: ObjectId[], isPrivilegedUser: boolean, privilegedUserFields?: string): Promise<string>;
}

// define the User model schema
const UserSchema = new mongoose.Schema<UserDocument, UserModel>({
  tenant: {
    type: String,
    index: true,
    default: '0',
  },
  email: {
    type: String,
    required: true,
  },
  password: String,
  fullName: String,
  firstName: String,
  lastName: String,
  birthDate: String,
  salt: String,
  roles: {
    type: [String],
    validate(roles: string[]) {
      const notValidRole = roles.find((role) => !config.roles.includes(role));
      if (notValidRole) {
        return Promise.reject({
          message: 'role not valid',
          role: notValidRole,
        });
      }
      return Promise.resolve();
    },
  },
  tokens: [
    {
      kind: {
        type: String,
        enum: ['cookie', 'oauth'],
        default: config.defaultAuthType,
      },
      metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: () => ({}),
      },
      tokenIdentifier: String,
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.index({tenant: 1, email: 1}, {unique: true});

/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @param {function} callback
 * @returns {object} callback
 */
UserSchema.methods.comparePassword = function comparePassword(
  this: UserDocument,
  password,
  callback
) {
  bcrypt.compare(password, this.password, callback);
};

UserSchema.methods.getToken = function getToken(authType, expiresIn) {
  let tokenIdentifier;
  if (authType === 'cookie') {
    tokenIdentifier = getUniqueId();
    this.tokens.push({
      kind: authType,
      tokenIdentifier,
    });
  }
  return getSignedToken(this, tokenIdentifier, expiresIn).token;
};

UserSchema.methods.getRefreshToken = function getRefreshToken(relatedToken) {
  const tokenIdentifier = getUniqueId();

  this.tokens.push({
    kind: 'oauth',
    tokenIdentifier,
    metadata: {relatedToken},
  });

  return jwt.sign(
    {
      sub: this._id,
      tenant: this.tenant,
      tokenIdentifier,
    },
    config.refreshTokenSecret,
    {expiresIn: config.refreshTokenExpiration}
  );
};

UserSchema.methods.updateToken = function updateToken(
  authType,
  currentIdentifier,
  newIdentifier,
  relatedToken
) {
  this.tokens = this.tokens.filter(
    (token) =>
      !(token.kind === authType && token.tokenIdentifier === currentIdentifier)
  );
  const token = {kind: authType, tokenIdentifier: newIdentifier};
  if (relatedToken) {
    (token as any).metadata = {relatedToken};
  }
  this.tokens.push(token);

  return this.save();
};

UserSchema.methods.deleteToken = function deleteToken(
  authType,
  tokenIdentifier
) {
  this.tokens = this.tokens.filter(
    (token) =>
      token.kind === authType && token.tokenIdentifier === tokenIdentifier
  );

  return this.save();
};

UserSchema.methods.getTokenByRelatedTokens = function getTokenByRelatedTokens(
  authType,
  tokenIdentifier
) {
  const token = this.tokens.find(
    (token) =>
      token.kind === authType &&
      token.metadata.toString().includes(tokenIdentifier)
  );

  return token ? token.tokenIdentifier : tokenIdentifier;
};

UserSchema.statics.getUsersList = function getUsersList(tenant: string, usersIds: ObjectId[], isPrivilegedUser = false, privilegedUserFields?: Array<string>) {
  if (isPrivilegedUser && !usersIds.length) {
    return this.find({})
      .select(privilegedUserFields)
      .lean()
      .exec()
      .then(users => JSON.stringify(users));
  }
  return cacheManager.wrap(`usersList.${tenant}.${isPrivilegedUser}.${usersIds.map(id => id.toString()).join(',')}`,
    () => {
      const query: Record<string, any> = {_id: {$in: usersIds}}
      query.tenant = tenant;

      return this.find(query)
        .select(isPrivilegedUser ? privilegedUserFields : 'fullName')
        .lean()
        .exec()
        .then(users => JSON.stringify(users))
        .catch(() => '[]');
    });
}

/**
 * The pre-save hook method.
 */
UserSchema.pre('save', function saveHook(next) {
  const user = this;

  // define role for new user
  if (!user.roles || user.roles.length === 0) {
    user.roles = [config.defaultRole];
  }

  if (!this.salt) {
    this.salt = bcrypt.genSaltSync();
  }

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();

  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) {
      return next(saltError);
    }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) {
        return next(hashError);
      }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});

const User = mongoose.model<UserDocument, UserModel>('User', UserSchema);
export default User

