import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customers")
      .send({
        name: "John Doe",
        address: {
          street: "street",
          number: 100,
          zip: "zip",
          city: "city",
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John Doe");
  });
});
