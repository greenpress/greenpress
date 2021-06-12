import { Response } from "express";
import { AuthRequest } from "../../types";
import { deleteToken } from "../services/users";
const { setCookie } = require("../services/tokens");

function removeToken(
  tenant: string,
  userId: string,
  authType: string,
  token: string
) {
  deleteToken(tenant, userId, authType, token, authType === "oauth").catch(
    Promise.resolve
  );
}

async function logout(req: AuthRequest, res: Response) {
  const tenant = (req.headers.tenant = (req.headers.tenant as string) || "0");
  const userId = req.userPayload.sub;

  let token, authType;
  if (req.cookies.token || req.signedCookies.token) {
    token = req.cookies.token || req.signedCookies.token;
    authType = "cookie";
    setCookie(res, "", -1);
  } else {
    token = req.headers.authorization?.split(" ")[1] ?? "";
    authType = "oauth";
  }
  removeToken(tenant, userId, authType, token);
  res.status(200).end();
}

module.exports = logout;
