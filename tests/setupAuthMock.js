import { jest } from "@jest/globals";

await jest.unstable_mockModule("../src/utils/middlewares/middlewares.js", () => ({
  VerifyToken: (req, res, next) => {
    req.user = { id: "test-user", role: "admin" };
    next();
  }
}));
