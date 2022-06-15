import {Request} from 'express'

export interface AuthRequest extends Request {
  headers: {
    tenant: string,
    authorization?: string,
    tenanthost?: string,
    origin?: string,
    host?: string,
  }
  userPayload: {
    sub: string,
    tenant: string,
    email: string,
    name: string,
    roles: string[],
    isPrivileged: boolean,
    user: any
  }
}
