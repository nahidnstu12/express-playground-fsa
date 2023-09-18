const express = require("express");
const {
  create,
  read,
  readAll,
  update,
  delete: remove,
  cancelCart,
} = require("../controller/cart");
const schema = require("../model/validation/cart");
const validate = require("../middleware/validate");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const router = express.Router();

router
  .route("")
  .get(authenticate, authorize(["app_admin", "customer"]), readAll)
  .post(
    authenticate,
    authorize(["customer"]),
    validate(schema.cartPOST),
    create,
  );

router
  .route("/:id")
  .get(authenticate, authorize(["app_admin", "customer"]), read)
  .delete(authenticate, authorize(["app_admin", "customer"]), remove)
  .put(
    authenticate,
    authorize(["app_admin", "customer"]),
    validate(schema.cartUPDATE),
    update,
  );
router
  .route("/:id/cancel")
  .get(authenticate, authorize(["app_admin", "customer"]), cancelCart);

module.exports = router;
