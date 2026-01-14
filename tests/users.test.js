import request from "supertest";
import { jest } from "@jest/globals";
import "../tests/setupAuthMock.js";
const { app } = await import("../src/app.js");

describe("Users API", () => {
  it("GET /api/users debería responder 200", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
  });
});
