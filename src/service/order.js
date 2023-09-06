const { AppdataSource } = require("../database/config");
const Order = require("../model/order");

const orderRepository = AppdataSource.getRepository(Order);
const service = {};

service.createOrderHandler = async (input) => {
  return await orderRepository.save(orderRepository.create({ ...input }));
};
service.readAllOrderHandler = async () => {
  return await orderRepository.find({
    select: {
      id: true,
      order_date: true,
      order_status: true,
      order_type: true,
      payment_status: true,
      user_id: true,
      menu_id: true,
      price: true,
      quantity: true,
    },
  });
};
service.readOrderHandler = async (id) => {
  return await orderRepository.find({
    select: {
      id: true,
      order_date: true,
      order_status: true,
      order_type: true,
      payment_status: true,
      user_id: true,
      menu_id: true,
      price: true,
      quantity: true,
    },
    where: { id },
  });
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
