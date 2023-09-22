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
  role: "admin",
};
const menuInput = {
  id: 100,
  name: "pasta",
  description: "pastea description",
  price: 250,
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

  test("menu created successfully when user role will be admin", async () => {
    await AppdataSource.initialize();
    //create app-admin user
    await request(app).post("/api/v1/users/testing").send(appAdminUser);
    await request(app).post("/api/v1/users/testing").send(userInputWithID);
    const token = jwtSign({ ...appAdminUser });

    const res = await request(app)
      .post("/api/v1/menus")
      .set("Authorization", `Bearer ${token}`)
      .send(menuInput);

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("name");
    expect(res.body.data).toHaveProperty("price");
  });
  test("menu created success when valid payload provided", async () => {
    const token = jwtSign({ ...appAdminUser });

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
    const token = jwtSign({ ...appAdminUser });
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
    const token = jwtSign({ ...userInputWithID });
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
    const token = jwtSign({ ...appAdminUser });
    const res = await request(app)
      .get("/api/v1/menus/100/changeStatus?status=1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);

    expect(res.body).toEqual({
      message: "Menu Published Successfully",
    });
  });
  test("menu  publishing failed when provide query parameter is invalid", async () => {
    const token = jwtSign({ ...appAdminUser });
    const res = await request(app)
      .get("/api/v1/menus/100/changeStatus?status=100")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      message: "Invalid publishing status.",
    });
  });
});
