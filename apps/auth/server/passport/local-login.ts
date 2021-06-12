const { defaultAuthType } = require("../../config");
import { getUser, comparePassword, setToken } from "../services/users";
import { Strategy } from "passport-local";
import { UserModel } from "../models/user";

module.exports = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
    session: false,
    passReqToCallback: true,
  },
  (req, email, password, done) => {
    const query: {
      email: string;
      tenant: undefined | string | string[];
      roles?: { $in: string[] };
    } = { email: email.trim(), tenant: req.headers.tenant };
    const authType = req.body.authType || defaultAuthType;

    if (req.body.roles && req.body.roles instanceof Array) {
      query.roles = { $in: req.body.roles };
    }
    getUser(query)
      .then((user) => comparePassword((user as unknown as UserModel), password))
      .then((user) => setToken((user as any), authType))
      .then(({ user, token, refreshToken, cookieToken }) => {
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
