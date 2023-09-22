const request = require("supertest");
const app = require("../../app");
const { clearDatabase, jwtSign, closeDatabase } = require("./utils");
const { adminUser, menuInput, userInput } = require("./mockData");

describe("Menu group", () => {
  beforeAll(async () => {
    return await clearDatabase();
  });
  afterAll(async () => {
    return await closeDatabase();
  });

  test("menu created successfully when user role will be admin", async () => {
    //create app-admin user
    await request(app).post("/api/v1/users/testing").send(adminUser);
    await request(app).post("/api/v1/users/testing").send(userInput);
    const token = jwtSign({ ...adminUser });

    const res = await request(app)
      .post("/api/v1/menus")
      .set("Authorization", `Bearer ${token}`)
      .send(menuInput);

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("name");
    expect(res.body.data).toHaveProperty("price");
  });
  test("menu created success when valid payload provided", async () => {
    const token = jwtSign({ ...adminUser });

    const res = await request(app)
      .post("/api/v1/menus")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...menuInput, name: "chicken chap" });

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("name");
    expect(res.body.data).toHaveProperty("price");
    expect(res.body.data.name).toBe("chicken chap");
    expect(res.body.data.price).toBe(menuInput.price);
  });
  test("menu can not created when name already taken ", async () => {
    const token = jwtSign({ ...adminUser });
    const res = await request(app)
      .post("/api/v1/menus")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...menuInput, name: "chicken chap" });

    expect(res.status).toBe(400);

    expect(res.body).toEqual({
      message: "Menu already exists",
    });
  });
  test("menu delete failed when user role will not be admin", async () => {
    const token = jwtSign({ ...userInput });
    const res = await request(app)
      .delete("/api/v1/menus/100")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(403);

    expect(res.body.errors).toEqual({
      status: 403,
      message: "You have not permission to do this",
    });
  });

  test("menu  will be published when provide query parameter is status= 1", async () => {
    const token = jwtSign({ ...adminUser });
    const res = await request(app)
      .get("/api/v1/menus/100/changeStatus?status=1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);

    expect(res.body).toEqual({
      message: "Menu Published Successfully",
    });
  });
  test("menu  publishing failed when provide query parameter is invalid", async () => {
    const token = jwtSign({ ...adminUser });
    const res = await request(app)
      .get("/api/v1/menus/100/changeStatus?status=100")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      message: "Invalid publishing status.",
    });
  });
});
