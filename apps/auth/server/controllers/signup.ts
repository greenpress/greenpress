import { NextFunction, Response } from 'express';
import passport from 'passport';
import { validateSignUpForm, tokenPayload } from './signin-signup-token';
import {AuthRequest} from '../../types';
import {getRequestHost} from '../services/req-host';

export function signup (req:AuthRequest, res:Response, next:NextFunction) {
  const validationErrors = validateSignUpForm(req.body)

  if (Object.keys(validationErrors).length > 0) {
    return res.json({ errors: validationErrors })
  }

  return passport.authenticate('local-signup', (err, data) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // the 11000 Mongo code is for a duplication email error
        return res.json({
          errors: {
            email: 'DUPLICATED_EMAIL'
          }
        })
      }

      return res.json({
        errors: {
          '': 'FORM_SUBMISSION_FAILED'
        }
      })
    }

    tokenPayload(getRequestHost(req), res, data);

  })(req, res, next)
}
