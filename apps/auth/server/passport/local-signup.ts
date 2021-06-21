import User, {UserDocument} from '../models/user';
import {setToken} from '../services/users';

import {defaultAuthType, defaultRole} from '../../config';
import {Strategy} from 'passport-local';

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true,
  },
  (req, email, password, done) => {
    const name = (req.body && req.body.name) || '';
    const newUser = new User({
      tenant: req.headers.tenant,
      email: email.trim(),
      password: password.trim(),
      name,
      roles: [defaultRole],
    });
    const authType = req.body.authType || defaultAuthType;

    setToken(newUser, authType)
      .then(({
               user,
               token,
               refreshToken,
               cookieToken
             }: { user: UserDocument, token: string, refreshToken: string, cookieToken: string }) => {
        done(null, {
          token,
          refreshToken,
          cookieToken,
          user: {
            email: user.email,
            name: user.name,
            roles: user.roles,
          },
        });
      })
      .catch(done);
  }
);
