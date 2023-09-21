const request = require("supertest");
const app = require("../../app");
// const UserService = require("../service/user");
const { AppdataSource } = require("../database/config");
const { clearDatabase } = require("./utils");

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
    // const createUserServiceMock = jest
    //   .spyOn(UserService, "createUserHandler")
    //   .mockReturnValueOnce(userPayload);

    // const mockuser = jest.fn(() => userInput);
    // const createUserServiceMockV2 = jest
    //   .spyOn(UserService, "createUserHandler")
    //   .mockImplementation(mockuser);

    const res = await request(app)
      .post("/api/v1/users/testing")
      .send(userInput);
    // console.log("create user testcase", res.body);
    // expect(mockuser).toHaveBeenCalledTimes(1);
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

    // expect(createUserServiceMock).toHaveBeenCalledWith(userPayload2);
  });
});

// describe("test Api group", () => {
//   test("test Api route", async () => {
//     const res = await request(app).get("/api/v1").send();
//     expect(res.status).toBe(200);
//     expect(res.body).toHaveProperty("message");
//   });
// });
