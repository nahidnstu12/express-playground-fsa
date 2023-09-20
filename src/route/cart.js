const express = require("express");
const {
  create,
  read,
  readAll,
  update,
  delete: remove,
} = require("../controller/cart");
const schema = require("../model/validation/cart");
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
    validate(schema.cartPOST),
    create,
  );

router
  .route("/:id")
  .get(authenticate, authorize(["admin", "customer"]), read)
  .delete(authenticate, authorize(["admin", "customer"]), remove)
  .put(authenticate, authorize(["admin"]), validate(schema.cartUPDATE), update);

// router.route("/:id/cancel").get(authenticate, authorize(["admin"]), cancelCart);

module.exports = router;
