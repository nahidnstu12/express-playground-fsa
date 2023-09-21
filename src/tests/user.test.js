const request = require("supertest");
const app = require("../../app");
const { AppdataSource } = require("../database/config");
const { clearDatabase } = require("./utils");

const userInput = {
  name: "rafsan",
  email: "raf404@mail.com",
  phone: "01621876123",
  password: "121212aA",
};
describe("test create group", () => {
  beforeAll(async () => {
    return await clearDatabase();
  });
  test("should return a 201 and create the user", async () => {
    await AppdataSource.initialize();

    const res = await request(app)
      .post("/api/v1/users/testing")
      .send(userInput);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("data");
    expect(res.body).toEqual({
      data: {
        name: "rafsan",
        phone: "01621876123",
        email: "raf404@mail.com",
        password: "121212aA",
        id: expect.any(Number),
        role: "customer",
        status: "pending",
        created_at: expect.any(String),
        updated_at: expect.any(String),
      },
      message: expect.any(String),
    });
  });
});
