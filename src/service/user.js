const {AppdataSource} = require('../database/config');
const User = require('../model/user');

const userRepository = AppdataSource.getRepository(User);
const service = {}

service.createUserHandler = async (input) => {
    return await userRepository.save(userRepository.create({ ...input }));
};
service.readAllUserHandler = async (input) => {
    return await userRepository.save(userRepository.create({ ...input }));
};
service.readUserHandler = async (input) => {
    return await userRepository.save(userRepository.create({ ...input }));
};
service.updateUserHandler = async (input) => {
    return await userRepository.save(userRepository.create({ ...input }));
};
service.deleteUserHandler = async (input) => {
    return await userRepository.save(userRepository.create({ ...input }));
};
service.approveUserHandler = async (input) => {
    return await userRepository.save(userRepository.create({ ...input }));
};
service.blockUserHandler = async (input) => {
    return await userRepository.save(userRepository.create({ ...input }));
};

module.exports = service;
