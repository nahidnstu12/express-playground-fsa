const request = require("supertest");
const app = require("../../app");
const { clearDatabase, jwtSign, closeDatabase } = require("./utils");
const {
  adminUser,
  userInputChef,
  userInput,
  menuInput,
  orderInput,
} = require("./mockData");

describe("Order group", () => {
  beforeAll(async () => {
    return await clearDatabase();
  });
  afterAll(async () => {
    return await closeDatabase();
  });

  test("order created successfully when user role will be customer", async () => {
    //create app-admin user
    await request(app).post("/api/v1/users/testing").send(adminUser);
    await request(app).post("/api/v1/users/testing").send(userInputChef);
    await request(app).post("/api/v1/users/testing").send(userInput);

    const tokenCustomer = jwtSign({ ...userInput });
    const tokenAdmin = jwtSign({ ...adminUser });
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
    const token = jwtSign({ ...userInput });

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
    const token = jwtSign({ ...adminUser });
    const res = await request(app)
      .get("/api/v1/orders/100/changeOrderStatus?order_status=order_invalid")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      message: "Invalid order status.",
    });
  });
});
