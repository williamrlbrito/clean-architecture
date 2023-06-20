import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/products").send({
      name: "Product 1",
      price: 100,
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(100);
  });

  it("should return 500 when an error occurs", async () => {
    const response = await request(app).post("/products").send({
      name: "Product 1",
    });

    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const one = await request(app).post("/products").send({
      name: "Product 1",
      price: 100,
    });

    expect(one.status).toBe(201);

    const two = await request(app).post("/products").send({
      name: "Product 2",
      price: 200,
    });

    expect(two.status).toBe(201);

    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(response.body.products.length).toBe(2);
  });
});
