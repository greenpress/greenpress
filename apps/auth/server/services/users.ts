import User, {UserDocument, UserModel} from '../models/user';
import {cookieTokenExpiration} from '../../config';
import {Types} from 'mongoose';
import {getAbsoluteDate} from './dates';

export async function getUser(query: any) {
  try {
    const user = await User.findOne(query);
    if (user) {
      return user;
    }
  } catch (err) {
    throw {code: 'FORM_SUBMISSION_FAILED', info: err};
  }

  throw {code: 'INCORRECT_CREDENTIALS'};
}

export async function updateUser(
  user: UserDocument | { _id: string | Types.ObjectId, tenant: string },
  {email = null, password = null, fullName = null, roles = null, firstName = null, lastName = null, birthDate = null}
) {
  let directUpdate;
  if (!(user instanceof User)) {
    if (email || roles || password) {
      user = await User.findOne(user);
    } else {
      directUpdate = {_id: user._id, tenant: user.tenant};
      user = {} as UserDocument;
    }
  }

  if (fullName) {
    user.fullName = fullName;
  }

  if (email) {
    user.email = email;
  }

  if (password) {
    user.password = password;
  }

  if (firstName) {
    user.firstName = firstName;
  }

  if (lastName) {
    user.lastName = lastName;
  }

  if (birthDate) {
    user.birthDate = getAbsoluteDate(birthDate);
  }

  if (roles) {
    user.roles = roles;
  }

  return (directUpdate
      ? User.updateOne(directUpdate, {$set: user})
      : user.save()
  ).catch((err: Error) =>
    Promise.reject({code: 'UPDATE_USER_FAILED', info: err})
  );
}

export async function deleteUser(userId: string, tenant: string) {
  if (!tenant) {
    throw new Error('tenant is missing');
  }

  try {
    await User.deleteOne({_id: userId, tenant}).exec();
    return {code: 'USER_DELETED_SUCCESSFULLY', info: userId};
  } catch (error) {
    throw {code: 'USER_DELETE_FAILED', info: error}
  }
}

export function comparePassword(user: UserModel, password: string) {
  return new Promise((resolve, reject) => {
    return user.comparePassword(password.trim(), (passwordErr, isMatch) => {
      if (passwordErr) {
        return reject({code: 'FORM_SUBMISSION_FAILED', info: passwordErr});
      }
      if (!isMatch) {
        return reject({code: 'INCORRECT_CREDENTIALS'});
      }
      resolve(user);
    });
  });
}

export function setToken(user: UserDocument, authType: string) {
  if (authType === 'oauth') {
    return setOAuthAuthentication(user);
  }
  if (authType === 'cookie') {
    return setCookieAuthentication(user);
  }
  throw {code: 'INVALID_AUTH_TYPE'};
}

export function updateToken(
  user: UserModel,
  authType: string,
  currentToken: string,
  newToken: string
) {
  return user
    .updateToken(authType, currentToken, newToken)
    .catch((err) => Promise.reject({code: 'UPDATE_TOKEN_FAILED', info: err}));
}

export async function deleteToken(
  tenant: string,
  userId: string,
  authType: string,
  token: string,
  isRelatedToken: boolean
) {
  try {
    const user: any = await User.findOne({_id: userId, tenant});
    if (isRelatedToken) {
      token = await user?.getTokenByRelatedTokens(authType, token);
    }
    user?.deleteToken(authType, token);
  } catch (e) {
    return false;
  }

  return true;
}

function setOAuthAuthentication(user: any) {
  const token = user.getToken('oauth');
  const refreshToken = user.getRefreshToken(token);

  return user.save().then(() => {
    return {
      token,
      refreshToken,
      user,
    };
  });
}

function setCookieAuthentication(user: any) {
  const cookieToken = user.getToken('cookie', cookieTokenExpiration / 1000);

  return user.save().then(() => {
    return {user, cookieToken};
  });
}

export function getUserIfTokenExists(tenant: string, userId: string, tokenId: string) {
  return User.findOne({
    _id: userId,
    tenant,
    'tokens.tokenIdentifier': tokenId,
  })
    .then((user: any) => user || Promise.reject())
    .catch(() => Promise.reject({code: 'USER_WITH_TOKEN_NOT_EXISTS'}));
}

