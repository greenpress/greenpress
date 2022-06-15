import passport from "passport";
import {Response, NextFunction} from "express";
import { validateSignInForm, tokenPayload } from "./signin-signup-token";
import {AuthRequest} from '../../types';
import {getRequestHost} from '../services/req-host';

export function signin(req: AuthRequest, res: Response, next: NextFunction) {
  const validationErrors = validateSignInForm(req.body);

  if (Object.keys(validationErrors).length > 0) {
    return res.status(401).json({ errors: validationErrors });
  }

  return passport.authenticate("local-login", (error, data) => {
    if (error !== null) {
      return res.status(401).json({
        errors: {
          [error.code === "INCORRECT_CREDENTIALS" ? "password" : "general"]: error,
        },
      });
    }
    if (!data) {
      return res.status(401).json({
        errors: {
          password: "password is incorrect",
        },
      });
    }

    tokenPayload(getRequestHost(req), res, data);
  })(req, res, next);
}


