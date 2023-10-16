const { faker } = require("@faker-js/faker");
const User = require("../model/user");
const Menu = require("../model/menu");
const Cart = require("../model/cart");
const Order = require("../model/order");

class MainSeeder {
  async run(dataSource, factoryManager) {
    const menuRepository = dataSource.getRepository(Menu);
    const cartRepository = dataSource.getRepository(Cart);
    const orderRepository = dataSource.getRepository(Order);

    const userFactory = factoryManager.get(User);
    const menuFactory = factoryManager.get(Menu);
    const cartFactory = factoryManager.get(Cart);
    const orderFactory = factoryManager.get(Order);

    const users = await userFactory.saveMany(5);

    const menus = await Promise.all(
      Array(10)
        .fill("")
        .map(async () => {
          return await menuFactory.make({
            userId: faker.helpers.arrayElement(users),
          });
        }),
    );
    const menuList = await menuRepository.save(menus);

    const carts = await Promise.all(
      Array(10)
        .fill("")
        .map(async () => {
          return await cartFactory.make({
            userId: faker.helpers.arrayElement(users),
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
            userId: faker.helpers.arrayElement(users),
            menuId: faker.helpers.arrayElement(menuList),
          });
        }),
    );
    await orderRepository.save(orders);
  }
}

module.exports = MainSeeder;
