import {AuthRequest} from '../../types';

export function getRequestHost(req: AuthRequest): string {
  return req.headers.tenanthost || req.headers.host || new URL(req.headers.origin).host;
}
