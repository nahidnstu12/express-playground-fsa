const { faker } = require("@faker-js/faker");
const User = require("../model/user");
const Menu = require("../model/menu");
const Cart = require("../model/cart");
const Order = require("../model/order");
const { USER_ROLES } = require("../utils/constants");
const { appAdminUser, getAdminUser } = require("./factory/user");

class MainSeeder {
  async run(dataSource, factoryManager) {
    const userRepository = dataSource.getRepository(User);
    const menuRepository = dataSource.getRepository(Menu);
    const cartRepository = dataSource.getRepository(Cart);
    const orderRepository = dataSource.getRepository(Order);

    const userFactory = factoryManager.get(User);
    const menuFactory = factoryManager.get(Menu);
    const cartFactory = factoryManager.get(Cart);
    const orderFactory = factoryManager.get(Order);

    await userRepository.save(appAdminUser);
    const users = await userFactory.saveMany(10);
    const adminUsers = getAdminUser(users, USER_ROLES.ADMIN);
    const customerUsers = getAdminUser(users, USER_ROLES.CUSTOMER);
    // console.log("users=======", users, adminUsers, customerUsers);
    const menus = await Promise.all(
      Array(10)
        .fill("")
        .map(async () => {
          return await menuFactory.make({
            userId: faker.helpers.arrayElement(adminUsers),
          });
        }),
    );
    const menuList = await menuRepository.save(menus);

    const carts = await Promise.all(
      Array(10)
        .fill("")
        .map(async () => {
          return await cartFactory.make({
            userId: faker.helpers.arrayElement(customerUsers),
            menuId: faker.helpers.arrayElement(menuList),
          });
        }),
    );
    await cartRepository.save(carts);

    const orders = await Promise.all(
      Array(10)
        .fill("")
        .map(async () => {
          return await orderFactory.make({
            userId: faker.helpers.arrayElement(customerUsers),
            menuId: faker.helpers.arrayElement(menuList),
          });
        }),
    );
    await orderRepository.save(orders);
  }
}

module.exports = MainSeeder;
