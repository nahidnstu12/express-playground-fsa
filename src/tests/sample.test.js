const request = require("supertest");
const app = require("../../app");
// const UserService = require("../service/user");
const { clearDatabase, closeDatabase } = require("./utils");
const { jwtSign, jwtVerify } = require("./utils");

// const userPayload = {
//   name: "rafsan",
//   phone: "01621876123",
//   email: "raf404@mail.com",
//   password: "121212aA",
//   id: 6,
//   role: "customer",
//   status: "pending",
//   created_at: "2023-09-20T21:06:00.620Z",
//   updated_at: "2023-09-20T21:06:00.620Z",
// };

const userInput = {
  id: 100,
  name: "rafsan",
  email: "raf404@mail.com",
  phone: "01621876123",
  password: "121212aA",
  role: "admin",
  status: "approved",
};

const menuInput = {
  id: 100,
  name: "pasta 404",
  description: "pastea description",
  price: 250,
  userId: 100,
};
describe("test create group", () => {
  beforeAll(async () => {
    return await clearDatabase();
  });
  afterAll(async () => {
    return await closeDatabase();
  });
  test("should return a 201 and create the user", async () => {
    const res = await request(app)
      .post("/api/v1/users/testing")
      .send(userInput);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("status");
    expect(res.body).toHaveProperty("data");
    expect(res.body).toEqual({
      data: {
        name: "rafsan",
        phone: "01621876123",
        email: "raf404@mail.com",
        password: "121212aA",
        id: expect.any(Number),
        role: "admin",
        status: "approved",
        created_at: expect.any(String),
        updated_at: expect.any(String),
      },
      status: expect.any(String),
    });

    // expect(createUserServiceMock).toHaveBeenCalledWith(userPayload2);
  });

  test("should return a 201 and create the menu", async () => {
    // await AppdataSource.initialize();

    const token = jwtSign({ ...userInput });

    // console.log("token", token);

    const res = await request(app)
      .post("/api/v1/menus/testing")
      .set("Authorization", `Bearer ${token}`)
      .send(menuInput);
    // console.log("create user testcase", res.body);
    // expect(mockuser).toHaveBeenCalledTimes(1);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("status");
    expect(res.body).toHaveProperty("data");
  });
});

// describe("test Api group", () => {
//   test("test Api route", async () => {
//     const res = await request(app).get("/api/v1").send();
//     expect(res.status).toBe(200);
//     expect(res.body).toHaveProperty("message");
//   });
// });
