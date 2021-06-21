import {NextFunction, Response, RequestHandler} from 'express';
import {AuthRequest} from '../../types';

export const onlyAuthenticated = <RequestHandler>function onlyAuthenticated(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.userPayload) {
    res.status(401).json({message: 'you are not authorized'}).end();
    return;
  }
  next()
}

export const onlyPrivileged = <RequestHandler>function onlyPrivileged(req: AuthRequest, res: Response, next: NextFunction) {
  if (!(req.userPayload && req.userPayload.isPrivileged)) {
    res.status(401).json({message: 'you are not authorized'}).end();
    return;
  }
  next();
}
