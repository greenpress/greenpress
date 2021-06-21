import User, {UserDocument, UserModel} from '../models/user';
import {cookieTokenExpiration} from '../../config';

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

export function updateUser(
  user: any,
  {email = null, password = null, name = null, roles = null}
) {
  let directUpdate;
  if (!(user instanceof User)) {
    directUpdate = {_id: user._id, tenant: user.tenant};
    user = {};
  }
  if (email) {
    user.email = email;
  }

  if (password) {
    user.password = password;
  }

  if (name) {
    user.name = name;
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

export function deleteUser(userId: string, tenant: string) {
  User.deleteOne({_id: userId, tenant})
    .then(() =>
      Promise.resolve({code: 'USER_DELETED_SUCCESSFULLY', info: userId})
    )
    .catch((error) =>
      Promise.reject({code: 'USER_DELETE_FAILED', info: error})
    );
}

export function comparePassword(user: UserModel, password: string) {
  return new Promise((resolve, reject) => {
    return user.comparePassword(password.trim(), (passwordErr, isMatch) => {
      if (passwordErr) {
        return reject({code: 'FORM_SUBMISSION_FAILED', info: passwordErr});
      }
      if (!isMatch) {
        return reject({code: 'INCORRECT_CREDENTIAL'});
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

