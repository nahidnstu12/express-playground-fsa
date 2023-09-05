const {AppdataSource} = require('../database/config');
const Cart = require('../model/cart');

const cartRepository = AppdataSource.getRepository(Cart);
const service = {}

service.createCartHandler = async (input) => {
    return await cartRepository.save(cartRepository.create({ ...input }));
};
service.readAllCartHandler = async (input) => {
    return await cartRepository.save(cartRepository.create({ ...input }));
};
service.readCartHandler = async (input) => {
    return await cartRepository.save(cartRepository.create({ ...input }));
};
service.updateCartHandler = async (input) => {
    return await cartRepository.save(cartRepository.create({ ...input }));
};
service.deleteCartHandler = async (input) => {
    return await cartRepository.save(cartRepository.create({ ...input }));
};
service.cancelCartHandler = async (input) => {
    return await cartRepository.save(cartRepository.create({ ...input }));
};

module.exports = service;
