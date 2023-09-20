const express = require("express");
const {
  create,
  read,
  readAll,
  update,
  delete: remove,
  orderCancel,
  changeOrderStatus,
} = require("../controller/order");
const schema = require("../model/validation/order");
const validate = require("../middleware/validate");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const router = express.Router();

router
  .route("")
  .get(authenticate, authorize(["admin", "customer"]), readAll)
  .post(
    authenticate,
    authorize(["customer"]),
    validate(schema.orderPOST),
    create,
  );

router
  .route("/:id")
  .get(authenticate, authorize(["admin", "customer"]), read)
  .delete(authenticate, authorize(["admin", "customer"]), remove)
  .put(
    authenticate,
    authorize(["admin", "customer"]),
    validate(schema.orderUPDATE),
    update,
  );

router
  .route("/:id/cancel")
  .get(authenticate, authorize(["admin"]), orderCancel);
router
  .route("/:id/changeOrderStatus")
  .get(authenticate, authorize(["admin"]), changeOrderStatus);

module.exports = router;
