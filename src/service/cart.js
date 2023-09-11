const { AppdataSource } = require("../database/config");
const Cart = require("../model/cart");

const cartRepository = AppdataSource.getRepository(Cart);
const service = {};

service.createCartHandler = async (input) => {
  return await cartRepository.save(cartRepository.create({ ...input }));
};
service.readAllCartHandler = async () => {
  return await cartRepository.find({
    select: {
      id: true,
      quantity: true,
      price: true,
      menuId: true,
      userId: true,
    },
  });
};
service.readCartHandler = async (id) => {
  return await cartRepository
    .createQueryBuilder("cart")
    .select([
      "cart.id",
      "cart.quantity",
      "cart.price",
      "user.id",
      "user.name",
      "user.role",
      "menu.id",
      "menu.name",
    ])
    .leftJoin("cart.user", "user")
    .leftJoin("cart.menu", "menu")
    .where("cart.id = :id", { id })
    .getOne();
};
// service.readCartHandler = async (id) => {
//   return await cartRepository.findOneOrFail({
//     select: {
//       id: true,
//       quantity: true,
//       price: true,
//       menuId: true,
//       userId: true,
//     },
//     where: {
//       id,
//     },
//   });
// };
service.updateCartHandler = async (id, data) => {
  const cart = await service.readCartHandler(id);

  if (!cart) {
    return false;
  }

  Object.assign(cart, data);

  return await cartRepository.save(cart);
};
service.deleteCartHandler = async (id) => {
  const cart = await service.readCartHandler(id);

  if (!cart) {
    return false;
  }

  return await cartRepository.delete(cart);
};
service.cancelCartHandler = async (id) => {
  const cart = await service.readCartHandler(id);

  if (!cart) {
    return false;
  }
  return await cartRepository.delete(cart);
};

module.exports = service;
