const express = require("express");
const {
  create,
  read,
  readAll,
  update,
  delete: remove,
  changeOrderStatus,
} = require("../controller/order");
const { USER_ROLES } = require("../utils/constants");
const schema = require("../model/validation/order");
const validate = require("../middleware/validate");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const routeparam = require("../middleware/routeparam");

const router = express.Router();
// Middleware functions
const adminAuth = [authenticate, authorize([USER_ROLES.ADMIN])];
const customerAuth = [authenticate, authorize([USER_ROLES.CUSTOMER])];
const adminCustomerAuth = [
  authenticate,
  authorize([USER_ROLES.ADMIN, USER_ROLES.CUSTOMER]),
];

router
  .route("")
  .get(adminCustomerAuth, readAll)
  .post(customerAuth, validate(schema.orderPOST), create);

router
  .route("/:id")
  .get(routeparam(), adminCustomerAuth, read)
  .delete(routeparam(), adminCustomerAuth, remove)
  .put(routeparam(), adminCustomerAuth, validate(schema.orderUPDATE), update);

router.route("/:id/changeOrderStatus").get(
  routeparam(),
  adminAuth,
  // validate(schema.orderStatus),
  changeOrderStatus,
);

module.exports = router;
