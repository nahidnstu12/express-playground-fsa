const express = require("express");
const {
  create,
  read,
  readAll,
  update,
  delete: remove,
  orderCancel,
} = require("../controller/order");
const schema = require("../model/validation/order");
const validate = require("../middleware/validate");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const router = express.Router();

router
  .route("")
  .get(authenticate, authorize(["app_admin", "customer"]), readAll)
  .post(
    authenticate,
    authorize(["app_admin", "customer"]),
    validate(schema.orderPOST),
    create,
  );

router
  .route("/:id")
  .get(authenticate, authorize(["app_admin", "customer"]), read)
  .delete(authenticate, authorize(["app_admin", "customer"]), remove)
  .put(
    authenticate,
    authorize(["app_admin", "customer"]),
    validate(schema.orderUPDATE),
    update,
  );

router
  .route("/:id/cancel")
  .get(authenticate, authorize(["app_admin", "customer"]), orderCancel);

module.exports = router;
