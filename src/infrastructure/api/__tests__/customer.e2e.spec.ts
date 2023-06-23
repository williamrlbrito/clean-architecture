import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
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

    const responseXML = await request(app)
      .get("/customers")
      .set("Accept", "application/xml");

    expect(responseXML.status).toBe(200);
    expect(responseXML.text).toContain(
      '<?xml version="1.0" encoding="UTF-8"?>'
    );
    expect(responseXML.text).toContain("<customers>");
    expect(responseXML.text).toContain("<customer>");
    expect(responseXML.text).toContain("<name>John Doe</name>");
    expect(responseXML.text).toContain("<address>");
    expect(responseXML.text).toContain("<street>street</street>");
    expect(responseXML.text).toContain("<number>100</number>");
    expect(responseXML.text).toContain("<zip>zip</zip>");
    expect(responseXML.text).toContain("<city>city</city>");
    expect(responseXML.text).toContain("</address>");
    expect(responseXML.text).toContain("</customer>");
    expect(responseXML.text).toContain("<customer>");
    expect(responseXML.text).toContain("<name>Jane Doe</name>");
    expect(responseXML.text).toContain("<address>");
    expect(responseXML.text).toContain("<street>street</street>");
    expect(responseXML.text).toContain("<number>100</number>");
    expect(responseXML.text).toContain("<zip>zip</zip>");
    expect(responseXML.text).toContain("<city>city</city>");
    expect(responseXML.text).toContain("</address>");
    expect(responseXML.text).toContain("</customer>");
    expect(responseXML.text).toContain("</customers>");
  });
});
