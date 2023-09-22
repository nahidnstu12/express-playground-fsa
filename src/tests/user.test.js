const request = require("supertest");
const app = require("../../app");
const { AppdataSource } = require("../database/config");
const { clearDatabase, jwtSign } = require("./utils");

const appAdminUser = {
  id: 100,
  name: "appadmin",
  email: "app@mail.com",
  phone: "01621876123",
  password: "121212aA",
  status: "approved",
  role: "app_admin",
};
const userInput = {
  name: "rafsan",
  email: "raf404@mail.com",
  phone: "01621876123",
  password: "121212aA",
  status: "approved",
};

const userInputWithID = {
  id: 202,
  name: "james",
  email: "raf44@mail.com",
  phone: "01621876123",
  password: "121212aA",
  status: "approved",
};

const userInputDataForUpdata = {
  phone: "01621876123",
  status: "approved",
};

describe("User group", () => {
  beforeAll(async () => {
    return await clearDatabase();
  });

  test("user created successfully when user role will be app-admin", async () => {
    await AppdataSource.initialize();
    //create app-admin user
    await request(app).post("/api/v1/users/testing").send(appAdminUser);
    await request(app).post("/api/v1/users/testing").send(userInputWithID);
    const token = jwtSign({ ...appAdminUser });

    const res = await request(app)
      .post("/api/v1/users")
      .set("Authorization", `Bearer ${token}`)
      .send(userInput);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("status");
    expect(res.body).toHaveProperty("data");
  });
  test("user created success when valid payload provided", async () => {
    const token = jwtSign({ ...appAdminUser });

    const res = await request(app)
      .post("/api/v1/users")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...userInput, email: "sakib@mail.com" });

    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe(userInput.name);
    expect(res.body.data.email).toBe("sakib@mail.com");
  });
  test("user lists fetched failed when user role will not be app-admin", async () => {
    const token = jwtSign({ ...userInput });
    const res = await request(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(403);

    expect(res.body.errors).toEqual({
      status: 403,
      message: "You have not permission to do this",
    });
  });
  test("single user fetched success when user role will be app-admin or admin", async () => {
    const token = jwtSign({ ...appAdminUser });
    const res = await request(app)
      .get("/api/v1/users/202")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);

    expect(res.body.data).toHaveProperty("name");
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data).toHaveProperty("email");
  });
  test("user update failed if user not found", async () => {
    const token = jwtSign({ ...appAdminUser });
    const res = await request(app)
      .put("/api/v1/users/200")
      .set("Authorization", `Bearer ${token}`)
      .send(userInputDataForUpdata);

    expect(res.status).toBe(404);

    expect(res.body).toEqual({
      message: "User not found",
    });
  });
  test("user will be approved when provide query parameter is approve = 1", async () => {
    const token = jwtSign({ ...appAdminUser });
    const res = await request(app)
      .get("/api/v1/users/202/changeApproval?approve=1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);

    expect(res.body).toEqual({
      message: "User Approved Successfully",
    });
  });
  test("user  approval failed when provide query parameter is invalid", async () => {
    const token = jwtSign({ ...appAdminUser });
    const res = await request(app)
      .get("/api/v1/users/202/changeApproval?approve=100")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      message: "Invalid approval status.",
    });
  });
});
