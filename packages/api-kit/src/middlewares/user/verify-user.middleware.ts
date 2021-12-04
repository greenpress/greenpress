import type { Response, NextFunction } from "express";
import type { RequestWithUserData } from "@middlewares/user/request-with-user-data.type";

export const verifyUserMiddleware = (
  req: RequestWithUserData,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    next();
  } else {
    res.status(401).end();
  }
};
