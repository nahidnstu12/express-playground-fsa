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
  PENDING: 1,
  APPROVED: 2,
  BLOCKED: 3,
  REJECTED: 4,
};

constants.USER_ROLES = {
  CUSTOMER: 1,
  CHEF: 2,
  DELIVERY_MAN: 3,
  ADMIN: 4,
  APP_ADMIN: 5,
};

constants.ORDER_TYPE = {
  INSTANT_ORDER: 1,
  HOME_DELIVERY: 2,
};

constants.ORDER_STATUS = {
  PENDING: 1,
  ORDER_TAKEN: 2,
  ORDER_PROCESSING: 3,
  ORDER_SHIPPED: 4,
  ORDER_DELIVERED: 5,
  ORDER_REJECTED: 6,
};

constants.ORDER_PAYMENT_STATUS = {
  PENDING: 1,
  PAID: 2,
  REJECTED: 3,
};

constants.MENU_VARIANTS = {
  PIZZA: 1,
  BBQ_DELIGHT: 2,
  PEPPERONI: 3,
  VEGGIE: 4,
  MUSHROOMS: 5,
};

constants.MENU_PUBLISH = {
  PUBLISHED: 1,
  UNPUBLISHED: 2,
};
module.exports = constants;
