const { AppdataSource } = require("../database/config");
const Order = require("../model/order");

const orderRepository = AppdataSource.getRepository(Order);
const service = {};

service.createOrderHandler = async (input) => {
  return await orderRepository.save(orderRepository.create({ ...input }));
};
service.readAllOrderHandler = async () => {
  return await orderRepository
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
      "user.role",
      "menu.id",
      "menu.name",
    ])
    .leftJoin("order.user", "user")
    .leftJoin("order.menu", "menu")
    .getMany();
};

service.readOrderHandler = async (id) => {
  return await orderRepository
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
      "user.role",
      "menu.id",
      "menu.name",
    ])
    .leftJoin("order.user", "user")
    .leftJoin("order.menu", "menu")
    .where("order.id = :id", { id })
    .getOne();
};
service.updateOrderHandler = async (id, data) => {
  const order = await service.readOrderHandler(id);

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

module.exports = service;
