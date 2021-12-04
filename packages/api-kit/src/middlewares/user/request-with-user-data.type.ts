import type { IncomingHttpHeaders } from "http";

import type { Request } from "express";

export type RequestWithUserData = Request & {
  user: Record<string, string | undefined>;
  headers: IncomingHttpHeaders & { user: string | undefined };
};
