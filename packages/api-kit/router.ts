import { Router } from 'express';
import { Router as ExpressRouter } from 'express-serve-static-core';

export function getRouter(): ExpressRouter {
  return Router();
}
