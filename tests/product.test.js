import request from "supertest";
import { jest } from "@jest/globals";
import "../tests/setupAuthMock.js";
const { app } = await import("../src/app.js");

describe("Products API", () => {
  it("GET /api/products debería responder 200", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
  });

  it("POST /api/products crea un producto", async () => {
    const productMock = {
      name: "Producto Test",
      price: 1000,
      stock: 10
    };

    const res = await request(app)
      .post("/api/products")
      .send(productMock);

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(productMock.name);
  });
});
