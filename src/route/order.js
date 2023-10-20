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

const router = express.Router();

router
  .route("")
  .get(
    authenticate,
    authorize([USER_ROLES.ADMIN, USER_ROLES.CUSTOMER]),
    readAll,
  )
  .post(
    authenticate,
    authorize([USER_ROLES.CUSTOMER]),
    validate(schema.orderPOST),
    create,
  );

router
  .route("/:id")
  .get(authenticate, authorize([USER_ROLES.ADMIN, USER_ROLES.CUSTOMER]), read)
  .delete(
    authenticate,
    authorize([USER_ROLES.ADMIN, USER_ROLES.CUSTOMER]),
    remove,
  )
  .put(
    authenticate,
    authorize([USER_ROLES.ADMIN, USER_ROLES.CUSTOMER]),
    validate(schema.orderUPDATE),
    update,
  );

// router
//   .route("/:id/cancel")
//   .get(authenticate, authorize([USER_ROLES.ADMIN]), orderCancel);

router.route("/:id/changeOrderStatus").get(
  authenticate,
  authorize([USER_ROLES.ADMIN]),
  // validate(schema.orderStatus),
  changeOrderStatus,
);

module.exports = router;
