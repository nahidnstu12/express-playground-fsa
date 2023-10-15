const { setSeederFactory } = require("typeorm-extension");
const User = require("../../model/user");
const { USER_ROLES, USER_STATUS } = require("../../utils/constants");
const {AppdataSource} = require("../../database/config");

// const userRepository = AppdataSource.getRepository(User);

exports.UsersFactory = setSeederFactory(User, (faker) => {
  console.log("UsersFactory 1")
  const user = new User();
  console.log("UsersFactory 2")
  user.name = faker.internet.userName();
  user.phone = faker.phone.number();
  user.email = faker.internet.email();
  user.password = "$10$uTq3dlNf7kjuBD8upY.JveFblB8QwZKHfUR13i/GTv9e1tbEuH3Qm"; //121212aA
  user.role = faker.helpers.enumValue(USER_ROLES);
  user.status = faker.helpers.enumValue(USER_STATUS);
  return user;
});
