import { verifyUserMiddleware, populateUserMiddleware } from "./user";
import { errorHandlingMiddleware } from "./error-handling.middleware";

export const errorHandlingMiddlewares = [errorHandlingMiddleware];
export const userMiddlewares = [populateUserMiddleware, verifyUserMiddleware];
