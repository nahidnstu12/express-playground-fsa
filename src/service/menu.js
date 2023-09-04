const {AppdataSource} = require('../database/config');
const User = require('../model/user');

const userRepository = AppdataSource.getRepository(User);
const service = {}

service.createUser = async (input) => {
    return await userRepository.save(userRepository.create({ ...input }));
};

module.exports = service;
