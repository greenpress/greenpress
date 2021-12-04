import type { Response, NextFunction } from 'express';
import type { RequestWithUserData } from '@middlewares/user/request-with-user-data.type';

export const populateUserMiddleware = (req: RequestWithUserData, res: Response, next: NextFunction) => {
  try {
    req.user = req.headers.user ? JSON.parse(req.headers.user) : null;
    next()
  } catch (e) {
    res.status(400).json({ code: 'INVALID_USER' }).end()
  }
}
