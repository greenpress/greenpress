import { onlyAuthenticated } from "../auth-check";
import { getExpressResMock } from "../../../mocks/express-res.mock";
import { AuthRequest } from "../../../types";

describe("Auth Check middlewares", () => {
  describe("onlyAuthenticated", () => {
    describe("When get request without a valid user", () => {
      const emptyRequest:any = {};
      it("should response error to user", () => {
        const resMock = getExpressResMock();
        const nextMock = jest.fn();
        onlyAuthenticated(
          emptyRequest,
          resMock as any,
          nextMock
        );

        expect(resMock.status).toBeCalledWith(401);
        expect(resMock.json).toBeCalledWith({
          message: "you are not authorized",
        });
        expect(resMock.end).toBeCalled();
      });

      it("should not trigger next middleware", () => {
        const resMock = getExpressResMock();
        const nextMock = jest.fn();
        onlyAuthenticated(
          emptyRequest as AuthRequest,
          resMock as any,
          nextMock
        );

        expect(nextMock).not.toBeCalled();
      });
    });

    describe("When get request with a valid user", () => {
      const reqWithUser = {
        userPayload: {},
      };
      it("should continue to next middleware", () => {
        const resMock = getExpressResMock();
        const nextMock = jest.fn();

        onlyAuthenticated(reqWithUser as AuthRequest, resMock as any, nextMock);

        expect(nextMock).toBeCalled();
        expect(nextMock.mock.calls.length).toBe(1);

        // next function should be called with not arguments
        expect(nextMock.mock.calls[0][0]).toBeUndefined();
      });
    });
  });
});
