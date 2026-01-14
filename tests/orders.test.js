import request from "supertest";
import { jest } from "@jest/globals";
import "../tests/setupAuthMock.js";
const { app } = await import("../src/app.js");

describe("Orders API", () => {
  it("GET /api/orders debería responder 200", async () => {
    const res = await request(app).get("/api/orders");
    expect(res.statusCode).toBe(200);
  });
});
