const request = require("supertest");
const app = require("../../app");
const { clearDatabase, jwtSign, closeDatabase } = require("./utils");
const {
  adminUser,
  userInputChef,
  userInput,
  cartInput,
  menuInput,
} = require("./mockData");

describe("Cart group", () => {
  beforeAll(async () => {
    return await clearDatabase();
  });
  afterAll(async () => {
    return await closeDatabase();
  });

  test("cart created successfully when user role will be customer", async () => {
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
      .post("/api/v1/carts")
      .set("Authorization", `Bearer ${tokenCustomer}`)
      .send(cartInput);

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("quantity");
    expect(res.body.data).toHaveProperty("price");
  });
  test("cart created success when valid payload provided", async () => {
    const token = jwtSign({ ...userInput });

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
    const token = jwtSign({ ...userInput });
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
      message: "You do not have permission to perform this action.",
    });
  });
});
