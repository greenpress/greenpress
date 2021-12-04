import type { IncomingHttpHeaders } from "http";
import { Request, Response, NextFunction } from "express";

type RequestWithUserData = Request & {
  user?: Record<string, any>;
  headers: IncomingHttpHeaders & { user?: string };
};

export function populateUser(
  req: RequestWithUserData,
  res: Response,
  next: NextFunction
) {
  try {
    req.user = req.headers.user ? JSON.parse(req.headers.user) : null;
    next();
  } catch (e) {
    res.status(400).json({ code: "INVALID_USER" }).end();
  }
}

export function verifyUser(
  req: RequestWithUserData,
  res: Response,
  next: NextFunction
) {
  if (req.user) {
    next();
  } else {
    res.status(401).end();
  }
}
