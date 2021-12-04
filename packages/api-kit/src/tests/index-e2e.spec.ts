import request from "supertest";

import App from "@/app";
import { IndexController } from "@controllers/index.controller";

describe("Index Controller", () => {
  describe("[GET] /", () => {
    it("response statusCode 401", () => {
      const app = new App({
        serviceName: "APP",
        controllers: [IndexController],
      });

      return request(app.getServer()).get("/").expect(401);
    });
  });
});
