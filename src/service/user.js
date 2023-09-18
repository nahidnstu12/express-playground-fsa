const { AppdataSource } = require("../database/config");
const User = require("../model/user");

const userRepository = AppdataSource.getRepository(User);
const service = {};

service.createUserHandler = async (input) => {
  const { email } = input;
  const isUserExist = await userRepository.findOneBy({
    email,
  });

  if (isUserExist) {
    return false;
  }
  return await userRepository.save(userRepository.create({ ...input }));
};
service.readAllUserHandler = async () => {
  return await userRepository.find({
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
      role: true,
      status: true,
    },
  });
};
service.readUserHandler = async (id) => {
  return await userRepository.findOneOrFail({
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
      role: true,
      status: true,
    },
    where: {
      id,
    },
  });
};
service.findUserByEmailHandler = async (email) => {
  return await userRepository.findOneOrFail({
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
      role: true,
      status: true,
    },
    where: {
      email,
    },
  });
};
service.updateUserHandler = async (id, data) => {
  const user = await service.readUserHandler(id);

  if (!user) {
    return false;
  }

  Object.assign(user, data);
  return await userRepository.save(user);
};
service.deleteUserHandler = async (id) => {
  const user = await service.readUserHandler(id);

  if (!user) {
    return false;
  }
  return await userRepository.delete({ id });
};
service.approveUserHandler = async (id) => {
  const user = await service.readUserHandler(id);

  if (!user) {
    return false;
  }
  Object.assign(user, { status: "approved" });

  return await userRepository.save(user);
};
service.blockUserHandler = async (id) => {
  const user = await service.readUserHandler(id);

  if (!user) {
    return false;
  }
  Object.assign(user, { status: "block" });

  return await userRepository.save(user);
};

module.exports = service;
