import {
  verifyToken,
  getUniqueId,
  setCookie,
  getSignedToken,
} from "../services/tokens";
import  { getUserIfTokenExists, updateToken }  from "../services/users";
import config from "../../config";
import {NextFunction, RequestHandler, Response} from 'express';
import { AuthRequest } from "../../types";

const {
  privilegedRoles,
  cookieTokenExpiration,
  cookieTokenVerificationTime,
} = config;

function oAuthVerify(req: AuthRequest, _res: Response, next: NextFunction) {
  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization!.split(" ")[1];
  const tenant = (req.headers.tenant = req.headers.tenant as string|| "0");

  return verifyToken(token, tenant)
    .then((payload) => setUserPayload(payload, req, next))
    .catch(() => {
      return next();
    });
}

async function cookieVerify(req:AuthRequest, res:Response, next: NextFunction) {
  // get the last part from a authorization header string like "bearer token-value"
  const token = req.signedCookies.token || req.cookies.token;
  const tenant = (req.headers.tenant = req.headers.tenant as string || "0");

  try {
    const payload:any = await verifyToken(token, tenant);
    const created = Number(payload.tokenIdentifier?.split(":")[0]);
    if (Date.now() - created < cookieTokenVerificationTime) {
      setUserPayload(payload, req, next);
      return;
    }
    const newCookieIdentifier = getUniqueId();
    const user = await getUserIfTokenExists(
      payload.tenant,
      payload.sub,
      payload.tokenIdentifier
    );
    await updateToken(
      user,
      "cookie",
      payload.tokenIdentifier,
      newCookieIdentifier
    );
    const { token: newToken, payload: newPayload } = getSignedToken(
      user,
      newCookieIdentifier,
      cookieTokenExpiration / 1000
    );

    setCookie(res, newToken);
    setUserPayload(newPayload, req, next);
  } catch (e) {
    next();
  }
}

function setUserPayload(payload:any, req:AuthRequest, next:NextFunction) {
  req.userPayload = payload;
  req.userPayload.isPrivileged = payload.roles.some((role:string) =>
    privilegedRoles.includes(role)
  );
  next();
}

/**
 *  The Auth Checker middleware function.
 */
export default <RequestHandler>function verifyUser(req:AuthRequest, res:Response, next:NextFunction) {
  if (req.cookies.token || req.signedCookies.token) {
    return cookieVerify(req, res, next);
  } else if (req.headers.authorization) {
    return oAuthVerify(req, res, next);
  }
  return next();
};
