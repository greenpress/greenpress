import { NextFunction, Response } from "express"
import { AuthRequest } from "../../types"

const verifyUser = require('./verify-user')
const User = require('../models/user')

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req:AuthRequest, res:Response, next:NextFunction) => {
  verifyUser(req, res, () => {
    // @ts-ignore I'm ignoring this but it should be userPayload, no?
    const { sub: _id, tenant } = req.payload
    User.findOne({ _id, tenant }).lean().then((user:any) => {
      // pass user details onto next route
      req.user = user
      (req.user! as any).isPrivileged = req.userPayload.isPrivileged
      return next()
    }).catch(() => {
      return next()
    })
  })

}
