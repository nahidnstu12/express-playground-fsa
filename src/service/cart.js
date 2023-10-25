const { AppdataSource } = require("../database/config");
const Cart = require("../model/cart");
const { readMenuHandler } = require("./menu");
const { readUserHandler } = require("./user");
const { USER_ROLES } = require("../utils/constants");

const cartRepository = AppdataSource.getRepository(Cart);
const service = {};

service.createCartHandler = async (input) => {
  const { menuId } = input.body;
  const { userId } = input.user;
  let isMenuExist = await readMenuHandler(menuId);
  if (!isMenuExist) {
    return {
      code: 400,
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
  let isMenuExist = await readMenuHandler(menuId);
  let isUserExist = await readUserHandler(userId);
  if (!isMenuExist) {
    return {
      code: 400,
      message: "Menu doesn't found.",
    };
  }
  if (!isUserExist) {
    return {
      code: 400,
      message: "User doesn't found.",
    };
  }
  return await cartRepository.findOneBy({ userId, menuId });
};

service.readAllCartHandler = async (user, { page, limit }) => {
  let cartQB = await cartRepository.createQueryBuilder("cart");
  let itemsQB = await cartQB
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

  if (user?.role !== USER_ROLES.ADMIN) {
    itemsQB = await itemsQB.where("cart.userId = :uId", { uId: user?.id });
  }
  const items = await itemsQB
    .skip((page - 1) * limit)
    .take(limit)
    .getMany();
  const itemCount = await cartQB
    .where("cart.userId = :uId", { uId: user?.id })
    .getCount();

  return { itemCount, items };
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

service.updateCartHandler = async (id, data) => {
  const cart = await service.readCartHandler(id);

  if (!cart) {
    return false;
  }

  Object.assign(cart, data);

  return await cartRepository.save(cart);
};
service.deleteCartHandler = async (id, queryRunner) => {
  const cart = await service.readCartHandler(id);
    console.log("CartHandler", cart)
  if (!cart) {
    return false;
  }

  return queryRunner
    ? await queryRunner.manager.getRepository(Cart).delete(cart)
    : await cartRepository.delete(cart);
};
// service.cancelCartHandler = async (id) => {
//   const cart = await service.readCartHandler(id);
//
//   if (!cart) {
//     return false;
//   }
//   return await cartRepository.delete(cart);
// };

module.exports = service;
