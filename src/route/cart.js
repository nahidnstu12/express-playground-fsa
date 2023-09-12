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

const router = express.Router();

router.route("").get(readAll).post(validate(schema.cartPOST), create);

router
  .route("/:id")
  .get(read)
  .delete(remove)
  .put(validate(schema.cartPOST), update);
router.route("/:id/cancel").get(cancelCart);

module.exports = router;
