const { setSeederFactory } = require("typeorm-extension");
const Cart = require("../../model/cart");

exports.CartFactory = setSeederFactory(Cart, async (faker) => {
  const cart = {};
  cart.quantity = faker.number.int({ min: 1, max: 5 });
  cart.price = faker.number.float({ min: 50, max: 200, precision: 0.2 });
  return cart;
});
