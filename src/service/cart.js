const { AppdataSource } = require("../database/config");
const Cart = require("../model/cart");
const { readMenuHandler } = require("./menu");

const cartRepository = AppdataSource.getRepository(Cart);
const service = {};

service.createCartHandler = async (input) => {
  const { menuId } = input.body;
  const { userId } = input.user;
  let isMenuExist = await readMenuHandler(menuId);
  if (!isMenuExist) {
    return {
      status: 400,
      message: "Menu doesn't found.",
    };
  }
  let isExistCart = await service.findCartByMenuAndUserId(userId, menuId);

  if (isExistCart) {
    isExistCart = {
      ...isExistCart,
      quantity: input.body.quantity + isExistCart.quantity,
    };
    return await cartRepository.save(isExistCart);
  }
  return await cartRepository.save(
    cartRepository.create({ ...input.body, ...input.user }),
  );
};
service.findCartByMenuAndUserId = async (userId, menuId) => {
  return await cartRepository.findOneBy({ userId, menuId });
};

service.readAllCartHandler = async (user) => {
  let queryBuilder = cartRepository
    .createQueryBuilder("cart")
    .select([
      "cart.id",
      "cart.quantity",
      "cart.price",
      "user.id",
      "user.name",
      "menu.id",
      "menu.name",
    ])
    .leftJoin("cart.user", "user")
    .leftJoin("cart.menu", "menu");

  if (user?.role !== "admin") {
    queryBuilder = queryBuilder.where("cart.userId = :uId", { uId: user?.id });
  }

  return await queryBuilder.getMany();
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
  console.log("service", { cart, id, data });
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
