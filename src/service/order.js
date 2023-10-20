const { AppdataSource } = require("../database/config");
const Order = require("../model/order");
const { findCartByMenuAndUserId, deleteCartHandler } = require("./cart");
const { USER_ROLES, ORDER_STATUS } = require("../utils/constants");
const { badRequest } = require("../utils/error");

const orderRepository = AppdataSource.getRepository(Order);
const service = {};

service.createOrderHandler = async (input) => {
  const { menuId } = input.body;
  const { userId } = input.user;
  let isExistCart = await findCartByMenuAndUserId(userId, menuId);
  console.log({ isExistCart });
  if (isExistCart?.code === 400) {
    return isExistCart;
  } else if (isExistCart?.code !== 400 && isExistCart) {
    await deleteCartHandler(isExistCart.id);
    return await orderRepository.save(
      orderRepository.create({ ...input.body, ...input.user }),
    );
  } else {
    return await orderRepository.save(
      orderRepository.create({ ...input.body, ...input.user }),
    );
  }
};

service.readAllOrderHandler = async (user, { page, limit }) => {
  let orderQB = orderRepository.createQueryBuilder("order");
  let itemsQB = await orderQB
    .select([
      "order.id",
      "order.quantity",
      "order.order_date",
      "order.order_status",
      "order.payment_status",
      "order.price",
      "user.id",
      "user.name",
      "user.role",
      "menu.id",
      "menu.name",
    ])
    .leftJoin("order.user", "user")
    .leftJoin("order.menu", "menu");

  if (user?.role !== USER_ROLES.ADMIN) {
    itemsQB = itemsQB.where("order.userId = :uId", { uId: user?.id });
  }

  const items = await itemsQB
    .skip((page - 1) * limit)
    .take(limit)
    .getMany();
  const itemCount = await orderQB
    .where("order.userId = :uId", { uId: user?.id })
    .getCount();

  return { itemCount, items };
};
service.readOrderHandler = async (id, user) => {
  let queryBuilder = orderRepository
    .createQueryBuilder("order")
    .select([
      "order.id",
      "order.quantity",
      "order.order_date",
      "order.order_status",
      "order.payment_status",
      "order.price",
      "user.id",
      "user.name",
      "menu.id",
      "menu.name",
    ])
    .leftJoin("order.user", "user")
    .leftJoin("order.menu", "menu")
    .where("order.id = :id", { id });

  if (user?.role !== USER_ROLES.ADMIN) {
    queryBuilder.andWhere("order.userId = :uId", {
      uId: user?.id,
    });
  }

  return await queryBuilder.getOne();
};

service.updateOrderHandler = async (id, data, user) => {
  const order = await service.readOrderHandler(id, user);

  if (!order) {
    return false;
  }

  Object.assign(order, data);
  // const res = await orderRepository.save(order);
  // console.log({ order, data, res });
  return await orderRepository.save(order);
};
service.deleteOrderHandler = async (id) => {
  const order = await service.readOrderHandler(id);

  if (!order) {
    return false;
  }
  return await orderRepository.delete({ id });
};
service.cancelOrderHandler = async (id) => {
  const order = await service.readOrderHandler(id);

  if (!order) {
    return false;
  }
  return await orderRepository.delete({ id });
};

service.orderStatusHandler = async (id, status, user) => {
  const order = await service.readOrderHandler(id, user);

  if (!order) {
    return {
      code: 404,
      message: "Order not found",
    };
  }
  // console.log({ valus: Object.values(ORDER_STATUS), status, order });
  if (Object.values(ORDER_STATUS).some((val) => val === status)) {
    Object.assign(order, { order_status: status });
  } else {
    return {
      code: 400,
      message: "Invalid order status.",
    };
  }

  return await orderRepository.save(order);
};

module.exports = service;
