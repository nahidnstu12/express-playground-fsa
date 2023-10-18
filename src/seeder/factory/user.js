const { setSeederFactory } = require("typeorm-extension");
const User = require("../../model/user");
const { USER_ROLES, USER_STATUS } = require("../../utils/constants");

exports.UsersFactory = setSeederFactory(User, async (faker) => {
  const user = {};
  delete USER_ROLES.APP_ADMIN;
  let modifiedUserRoles = USER_ROLES;
  user.name = faker.internet.userName();
  user.phone = faker.phone.number();
  user.email = faker.internet.email();
  user.password = "$2a$10$4MdjnOO2ymx3HmJPjiNqf.zEEA3Szt3yob3AF2d1RFlLz4uL5cpD6"; //121212aA
  user.role = faker.helpers.enumValue(modifiedUserRoles);
  user.status = faker.helpers.enumValue(USER_STATUS);
  return user;
});

exports.appAdminUser = {
  name: "App Admin",
  email: "app@mail.com",
  phone: "01621871111",
  password: "$2a$10$4MdjnOO2ymx3HmJPjiNqf.zEEA3Szt3yob3AF2d1RFlLz4uL5cpD6",
  role: USER_ROLES.APP_ADMIN,
  status: USER_STATUS.APPROVED,
};

exports.getAdminUser = (users, role) => {
  return users.filter((user) => user.role == role);
};
