//customer
exports.userInput = {
  id: 102,
  name: "rafsan",
  email: "customer404@mail.com",
  phone: "01621876123",
  password: "121212aA",
  status: "approved",
};
exports.userInput2 = {
  id: 104,
  name: "rafsan",
  email: "customre@mail.com",
  phone: "01621876123",
  password: "121212aA",
  status: "approved",
};
//app-admin
exports.appAdminUser = {
  id: 100,
  name: "appadmin",
  email: "app@mail.com",
  phone: "01621876123",
  password: "121212aA",
  status: "approved",
  role: "app_admin",
};
//admin
exports.adminUser = {
  id: 101,
  name: "admin",
  email: "admin@mail.com",
  phone: "01621876123",
  password: "121212aA",
  status: "approved",
  role: "admin",
};
// chef
exports.userInputChef = {
  id: 103,
  name: "james",
  email: "checf@mail.com",
  phone: "01621876123",
  password: "121212aA",
  role: "chef",
  status: "approved",
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
};
exports.userInputDataForUpdata = {
  phone: "01621876123",
  status: "approved",
};
