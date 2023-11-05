const express = require("express");
const {
  create,
  read,
  readAll,
  update,
  delete: remove,
} = require("../controller/cart");
const { USER_ROLES } = require("../utils/constants");
const schema = require("../model/validation/cart");
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
  .post(customerAuth, validate(schema.cartPOST), create);

router
  .route("/:id")
  .get(routeparam(),adminCustomerAuth, read)
  .delete(routeparam(),adminCustomerAuth, remove)
  .put(routeparam(),adminAuth, validate(schema.cartUPDATE), update);

// router.route("/:id/cancel").get(authenticate, authorize([USER_ROLES.ADMIN]), cancelCart);

module.exports = router;
