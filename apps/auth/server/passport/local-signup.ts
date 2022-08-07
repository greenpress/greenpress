import User, {UserDocument} from '../models/user';
import {setToken} from '../services/users';

import {defaultAuthType, defaultRole} from '../../config';
import {Strategy} from 'passport-local';
import {getAbsoluteDate} from '../services/dates';

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
    const { name, fullName, firstName, lastName, birthDate } = req.body || {};
    const newUser = new User({
      tenant: req.headers.tenant,
      email: email.trim(),
      password: password.trim(),
      fullName: fullName || name || (`${firstName} ${lastName}`),
      firstName,
      lastName,
      birthDate: birthDate ? getAbsoluteDate(birthDate) : undefined,
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
            name: user.fullName,
            fullName: user.fullName,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: user.roles,
          },
        });
      })
      .catch(done);
  }
);
