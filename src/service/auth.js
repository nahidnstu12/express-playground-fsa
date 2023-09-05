const {AppdataSource} = require('../database/config');
const User = require('../model/user');

const authRepository = AppdataSource.getRepository(User);
const service = {}

service.registerHandler = async (input) => {
    return await authRepository.save(authRepository.create({ ...input }));
};
service.loginHandler = async (input) => {
    return await authRepository.save(authRepository.create({ ...input }));
};
service.profileHandler = async (input) => {
    return await authRepository.save(authRepository.create({ ...input }));
};

module.exports = service;
