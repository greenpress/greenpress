import { NextFunction, Response } from "express";
import { AuthRequest } from "../../types";

export function onlyAuthenticated(req:AuthRequest, res:Response, next: NextFunction) {
  if (!req.userPayload) {
    return res.status(401).json({ message: "you are not authorized" }).end();
  }
  next()
}

export function onlyPrivileged(req:AuthRequest, res:Response, next: NextFunction)  {
  if (!(req.userPayload && req.userPayload.isPrivileged)) {
    return res.status(401).json({ message: "you are not authorized" }).end();
  }
  next();
}
