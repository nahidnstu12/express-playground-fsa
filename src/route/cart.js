const express = require("express");
const {
  create,
  read,
  readAll,
  update,
  delete: remove,
} = require("../controller/cart");
const {USER_ROLES} = require("../utils/constants");
const schema = require("../model/validation/cart");
const validate = require("../middleware/validate");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const router = express.Router();

router
  .route("")
  .get(authenticate, authorize([USER_ROLES.ADMIN, USER_ROLES.CUSTOMER]), readAll)
  .post(
    authenticate,
    authorize([USER_ROLES.CUSTOMER]),
    validate(schema.cartPOST),
    create,
  );

router
  .route("/:id")
  .get(authenticate, authorize([USER_ROLES.ADMIN, USER_ROLES.CUSTOMER]), read)
  .delete(authenticate, authorize([USER_ROLES.ADMIN, USER_ROLES.CUSTOMER]), remove)
  .put(authenticate, authorize([USER_ROLES.ADMIN]), validate(schema.cartUPDATE), update);

// router.route("/:id/cancel").get(authenticate, authorize([USER_ROLES.ADMIN]), cancelCart);

module.exports = router;
