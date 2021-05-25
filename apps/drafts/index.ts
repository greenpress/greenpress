import { port, ip } from "./config";

require("./server/routes");

require("@greenpress/api-kit")
  .start("Drafts Service", port, ip);
