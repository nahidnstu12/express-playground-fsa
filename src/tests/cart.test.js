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
const cartInput = {
  id: 100,
  quantity: 3,
  price: 250,
  menuId: menuInput.id,
};

const userInputWithID = {
  id: 102,
  name: "james",
  email: "raf44@mail.com",
  phone: "01621876123",
  password: "121212aA",
  status: "approved",
};
const userInputChef = {
  id: 103,
  name: "james",
  email: "checf@mail.com",
  phone: "01621876123",
  password: "121212aA",
  role: "chef",
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

  test("cart created successfully when user role will be customer", async () => {
    await AppdataSource.initialize();
    //create app-admin user
    await request(app).post("/api/v1/users/testing").send(appAdminUser);
    await request(app).post("/api/v1/users/testing").send(userInputChef);
    await request(app).post("/api/v1/users/testing").send(userInputWithID);

    const tokenCustomer = jwtSign({ ...userInputWithID });
    const tokenAdmin = jwtSign({ ...appAdminUser });
    await request(app)
      .post("/api/v1/menus")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send(menuInput);

    const res = await request(app)
      .post("/api/v1/carts")
      .set("Authorization", `Bearer ${tokenCustomer}`)
      .send(cartInput);

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("quantity");
    expect(res.body.data).toHaveProperty("price");
  });
  test("cart created success when valid payload provided", async () => {
    const token = jwtSign({ ...userInputWithID });

    const res = await request(app)
      .post("/api/v1/carts")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...cartInput });

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("userId");
    expect(res.body.data).toHaveProperty("price");
    expect(res.body.data).toHaveProperty("menuId");
    expect(res.body.data.menuId).toBe(100);
    expect(res.body.data.price).toBe(cartInput.price);
  });
  test("should not create new cart when missing menu", async () => {
    const token = jwtSign({ ...userInputWithID });
    const res = await request(app)
      .post("/api/v1/carts")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...cartInput, menuId: 300 });

    expect(res.status).toBe(400);
    expect(res.body.data).toHaveProperty("message");
    expect(res.body.data.message).toBe("Menu doesn't found.");

    expect(res.body.data).toEqual({
      status: 400,
      message: "Menu doesn't found.",
    });
  });
  test("cart lists fetched failed when user role will not be admin or customer", async () => {
    const token = jwtSign(userInputChef);

    const res = await request(app)
      .get("/api/v1/carts")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(403);

    expect(res.body.errors).toEqual({
      status: 403,
      message: "You have not permission to do this",
    });
  });
});
