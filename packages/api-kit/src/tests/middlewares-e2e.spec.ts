import request from "supertest";

import { IndexController } from "@controllers/index.controller";
import App from "@/app";

describe("Middlewares", () => {
  describe("populateUser", () => {
    it("should populate user data from header and return 200", () => {
      const app = new App({
        serviceName: "APP",
        controllers: [IndexController],
      });

      const mockUser = {
        id: "123",
        name: "John Doe",
        email: "john@doe.com",
      };

      request
        .agent(app.getServer())
        .get("/user")
        .set({ user: JSON.stringify(mockUser) })
        .end((err, res) => {
          expect(res.status).toBe(200);
          expect(res.body.user).toEqual(mockUser);
        });
    });
  });

  describe("verifyUser", () => {
    it("should return unauthorized if no user was specified through the headers", async () => {
      const app = new App({
        serviceName: "APP",
        controllers: [IndexController],
      });

      request(app.getServer())
        .get("/")
        .end((err, res) => {
          expect(res.body.user).toBeUndefined();
          expect(res.status).toBe(401);
        });
    });
  });
});
