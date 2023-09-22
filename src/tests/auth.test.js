const request = require("supertest");
const app = require("../../app");
const { AppdataSource } = require("../database/config");
const { clearDatabase, jwtSign } = require("./utils");

const userInput = {
  id: 100,
  name: "rafsan",
  email: "raf404@mail.com",
  phone: "01621876123",
  password: "121212aA",
  status: "approved",
};

const loginInput = {
  email: "raf404@mail.com",
  password: "121212aA",
};
const wrongLoginInput = {
  email: "raf404@mail.com",
  password: "121212",
};
const wrongLoginInput2 = {
  email: "raf@mail.com",
  password: "121212",
};

describe("User Authentication group", () => {
  beforeAll(async () => {
    return await clearDatabase();
  });

  test("given the username and password are valid", async () => {
    await AppdataSource.initialize();

    const res = await request(app)
      .post("/api/v1/auth/register")
      .send(userInput);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("status");
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("data.token");

    expect(res.body).toEqual({
      status: "Success",
      data: {
        status: 201,
        message: "Successfully registered user",
        token: expect.any(String),
      },
    });
  });
  test("user registration failed when already user exists", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send(userInput);

    expect(res.status).toBe(400);

    expect(res.body).toEqual({
      status: "fail",
      message: "Already Registered",
    });
  });
  test("user login success when given the email and password are valid", async () => {
    const res = await request(app).post("/api/v1/auth/login").send(loginInput);

    expect(res.status).toBe(200);

    expect(res.body).toEqual({
      status: "Success",
      data: {
        status: 200,
        message: "login successful",
        token: expect.any(String),
      },
    });
  });
  test("user login failed when given the email and password are not matched", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send(wrongLoginInput);

    expect(res.status).toBe(400);

    expect(res.body).toEqual({
      status: "fail",
      message: "credentials do not match",
    });
  });
  test("user login failed when user not found", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send(wrongLoginInput2);

    expect(res.status).toBe(400);

    expect(res.body).toEqual({
      status: "fail",
      message: "User not found",
    });
  });
  test("user profile failed when user provide no token", async () => {
    const res = await request(app).get("/api/v1/auth/profile");

    expect(res.status).toBe(401);

    expect(res.body).toEqual({
      errors: {
        status: 401,
        message: "Authentication Failed",
      },
      dev_note: "global error",
    });
  });
  test("user profile failed when user provide valid token", async () => {
    const token = jwtSign({ ...userInput });
    const res = await request(app)
      .get("/api/v1/auth/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
  });
});
