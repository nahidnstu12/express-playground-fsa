const { AppdataSource } = require("../database/config");
const Order = require("../model/order");
const { findCartByMenuAndUserId, deleteCartHandler } = require("./cart");
const { USER_ROLES, ORDER_STATUS } = require("../utils/constants");

const orderRepository = AppdataSource.getRepository(Order);
const service = {};

service.createOrderHandler = async (input) => {
  const queryRunner = AppdataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const { menuId } = input.body;
    const { userId } = input.user;
    let isExistCart = await findCartByMenuAndUserId(userId, menuId);
    if (isExistCart) {
      await queryRunner.manager.deleteCartHandler(isExistCart.id);
    }
    await queryRunner.manager.save(
      orderRepository.create({ ...input.body, ...input.user }),
    );
    await queryRunner.commitTransaction();
  } catch (err) {
    // since we have errors let's rollback changes we made
    await queryRunner.rollbackTransaction();
  } finally {
    // you need to release query runner which is manually created:
    await queryRunner.release();
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
  // console.log({valus: Object.values(ORDER_STATUS), status})
  if (Object.values(ORDER_STATUS).some((val) => val === status)) {
    Object.assign(order, { order_status: status });
  } else {
    return {
      status: 400,
      message: "Invalid order status.",
    };
  }

  return await orderRepository.save(order);
};

module.exports = service;
