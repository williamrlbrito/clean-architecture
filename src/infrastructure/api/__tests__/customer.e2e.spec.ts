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

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("John Doe");
    expect(response.body.address.street).toBe("street");
    expect(response.body.address.number).toBe(100);
    expect(response.body.address.zip).toBe("zip");
    expect(response.body.address.city).toBe("city");
  });

  it("should return 500 when an error occurs", async () => {
    const response = await request(app).post("/customers").send({
      name: "John Doe",
    });

    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
    const one = await request(app)
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

    expect(one.status).toBe(201);

    const two = await request(app)
      .post("/customers")
      .send({
        name: "Jane Doe",
        address: {
          street: "street",
          number: 100,
          zip: "zip",
          city: "city",
        },
      });

    expect(two.status).toBe(201);

    const response = await request(app).get("/customers");

    expect(response.status).toBe(200);
    expect(response.body.customers.length).toBe(2);
  });
});
