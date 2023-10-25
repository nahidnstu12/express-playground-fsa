const { AppdataSource } = require("../database/config");
const User = require("../model/user");
const { USER_STATUS, ORDER_STATUS } = require("../utils/constants");

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
service.readAllUserHandler = async ({ page, limit }) => {
  const itemCount = await userRepository.count();
  const items = await userRepository.find({
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
      role: true,
      status: true,
    },
    skip: (page - 1) * limit,
    take: limit,
  });
  return { itemCount, items };
};
service.readUserHandler = async (id) => {
  return await userRepository.findOne({
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
  return await userRepository.findOne({
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
service.approveUserHandler = async (id, status) => {
  const user = await service.readUserHandler(id);

  if (!user) {
    return false;
  }

  if (Object.values(USER_STATUS).some((val) => val === status)) {
    Object.assign(user, { status: status });
  } else {
    return {
      code: 400,
      message: "Invalid approval status.",
    };
  }
  // if (status === USER_STATUS.APPROVED) {
  //   Object.assign(user, { status: USER_STATUS.APPROVED });
  // } else if (status === USER_STATUS.BLOCKED) {
  //   Object.assign(user, { status: USER_STATUS.BLOCKED });
  // } else {
  //   return {
  //     code: 400,
  //     message: "Invalid approval status.",
  //   };
  // }

  return await userRepository.save(user);
};

module.exports = service;
