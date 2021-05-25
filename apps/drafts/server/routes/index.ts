import { app as getApp } from "@greenpress/api-kit";
import draftRoutes from "./drafts";

const app = getApp();
draftRoutes(app);
