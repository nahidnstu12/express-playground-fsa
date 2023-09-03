const {AppdataSource} = require('../database/config');
const User = require('../model/user');

const userRepository = AppdataSource.getRepository(User);

exports.createUser = async (input) => {
    return await userRepository.save(userRepository.create({ ...input }));
};
