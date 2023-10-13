//customer
const {USER_STATUS, USER_ROLES} = require("../utils/constants");
exports.userInput = {
  id: 102,
  name: "customer",
  email: "customer404@mail.com",
  phone: "01621876123",
  password: "121212aA",
  status: USER_STATUS.APPROVED,
};
exports.userInput2 = {
  id: 104,
  name: "rafsan",
  email: "rafsan@mail.com",
  phone: "01621876123",
  password: "121212aA",
  status: USER_STATUS.APPROVED,
};
//app-admin
exports.appAdminUser = {
  id: 100,
  name: "appadmin",
  email: "app@mail.com",
  phone: "01621876123",
  password: "121212aA",
  status: USER_STATUS.APPROVED,
  role: USER_ROLES.APP_ADMIN,
};
//admin
exports.adminUser = {
  id: 101,
  name: "admin",
  email: "admin@mail.com",
  phone: "01621876123",
  password: "121212aA",
  status: USER_STATUS.APPROVED,
  role: USER_ROLES.ADMIN,
};
// chef
exports.userInputChef = {
  id: 103,
  name: "james",
  email: "checf@mail.com",
  phone: "01621876123",
  password: "121212aA",
  role: USER_ROLES.CHEF,
  status: USER_STATUS.APPROVED,
};

exports.loginInput = {
  email: "customer404@mail.com",
  password: "121212aA",
};
exports.wrongLoginInput = {
  email: "customer404@mail.com",
  password: "121212",
};
exports.wrongLoginInput2 = {
  email: "raf@mail.com",
  password: "121212",
};
exports.menuInput = {
  id: 100,
  name: "pasta",
  description: "pastea description",
  price: 250,
};
exports.cartInput = {
  id: 100,
  quantity: 3,
  price: 250,
  menuId: 100,
};
exports.orderInput = {
  id: 100,
  quantity: 3,
  price: 250,
  order_date: "2015-12-20 10:01:00.999999",
  payment_status: "paid",
  menuId: 100,
  userId: 104
};
exports.userInputDataForUpdata = {
  phone: "01621876123",
  status: USER_STATUS.APPROVED,
};
