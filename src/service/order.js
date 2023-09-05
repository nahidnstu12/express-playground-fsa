const {AppdataSource} = require('../database/config');
const Order = require('../model/order');

const orderRepository = AppdataSource.getRepository(Order);
const service = {}

service.createOrderHandler = async (input) => {
    return await orderRepository.save(orderRepository.create({ ...input }));
};
service.readAllOrderHandler = async (input) => {
    return await orderRepository.save(orderRepository.create({ ...input }));
};
service.readOrderHandler = async (input) => {
    return await orderRepository.save(orderRepository.create({ ...input }));
};
service.updateOrderHandler = async (input) => {
    return await orderRepository.save(orderRepository.create({ ...input }));
};
service.deleteOrderHandler = async (input) => {
    return await orderRepository.save(orderRepository.create({ ...input }));
};
service.cancelOrderHandler = async (input) => {
    return await orderRepository.save(orderRepository.create({ ...input }));
};

module.exports = service;
