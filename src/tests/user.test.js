const request = require("supertest");
const app = require("../../app");
const { clearDatabase, jwtSign, closeDatabase } = require("./utils");
const {
  appAdminUser,
  userInput,
  userInputDataForUpdata,
  userInput2,
} = require("./mockData");

describe("User group", () => {
  beforeAll(async () => {
    return await clearDatabase();
  });
  afterAll(async () => {
    return await closeDatabase();
  });

  test("user created successfully when user role will be app-admin", async () => {
    //create app-admin user
    await request(app).post("/api/v1/users/testing").send(appAdminUser);
    await request(app).post("/api/v1/users/testing").send(userInput);
    const token = jwtSign({ ...appAdminUser });

    const res = await request(app)
      .post("/api/v1/users")
      .set("Authorization", `Bearer ${token}`)
      .send(userInput2);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("status");
    expect(res.body).toHaveProperty("data");
  });
  test("user created success when valid payload provided", async () => {
    const token = jwtSign({ ...appAdminUser });

    const res = await request(app)
      .post("/api/v1/users")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...userInput2, email: "sakib@mail.com" });

    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe(userInput2.name);
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
      message: "You do not have permission to perform this action.",
    });
  });
  test("single user fetched success when user role will be app-admin or admin", async () => {
    const token = jwtSign({ ...appAdminUser });
    const res = await request(app)
      .get("/api/v1/users/102")
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
      .get("/api/v1/users/102/changeApproval?approve=1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);

    expect(res.body).toEqual({
      status: 200,
      message: "User Approved Successfully",
    });
  });
  test("user  approval failed when provide query parameter is invalid", async () => {
    const token = jwtSign({ ...appAdminUser });
    const res = await request(app)
      .get("/api/v1/users/102/changeApproval?approve=100")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      status: 400,
      message: "Invalid approval status.",
    });
  });
});
