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
const orderInput = {
  id: 100,
  quantity: 3,
  price: 250,
  order_date: "2015-12-20 10:01:00.999999",
  payment_status: "paid",
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

  test("order created successfully when user role will be customer", async () => {
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
      .post("/api/v1/orders")
      .set("Authorization", `Bearer ${tokenCustomer}`)
      .send(orderInput);

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("order_date");
    expect(res.body.data).toHaveProperty("price");
  });
  test("order created success when valid payload provided", async () => {
    const token = jwtSign({ ...userInputWithID });

    const res = await request(app)
      .post("/api/v1/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...orderInput });

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("userId");
    expect(res.body.data).toHaveProperty("price");
    expect(res.body.data).toHaveProperty("menuId");
    expect(res.body.data.menuId).toBe(100);
    expect(res.body.data.price).toBe(orderInput.price);
    expect(res.body.data.order_date).toBe(orderInput.order_date);
  });
  test("order lists fetched failed when user role will not be admin or customer", async () => {
    const token = jwtSign(userInputChef);

    const res = await request(app)
      .get("/api/v1/orders")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(403);

    expect(res.body.errors).toEqual({
      status: 403,
      message: "You have not permission to do this",
    });
  });
  test("order status can not changed if valid order_status not provided ", async () => {
    const token = jwtSign({ ...appAdminUser });
    const res = await request(app)
      .get("/api/v1/orders/100/changeOrderStatus?order_status=order_invalid")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      message: "Invalid order status.",
    });
  });
});
