const constants = {};
constants.HTTP = {
  200: "200",
  201: "201",
  400: "400",
  401: "401",
  403: "403",
  404: "404",
  500: "500",
};

constants.USER_STATUS = {
  // enum: ["pending", "approved", "block", "reject"],
  PENDING: 1,
  APPROVED: 2,
  BLOCKED: 3,
  REJECTED: 4
}

constants.USER_ROLES = {
  // ["customer", "chef", "delivary_boy", "app_admin", "admin"],
  CUSTOMER: 1,
  CHEF: 2,
  DELIVERY_MAN: 3,
  ADMIN: 4,
  APP_ADMIN: 5
}
module.exports = constants;
