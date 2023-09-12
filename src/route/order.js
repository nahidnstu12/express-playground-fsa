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

const router = express.Router();

router.route("").get(readAll).post(validate(schema.orderPOST), create);

router
  .route("/:id")
  .get(read)
  .delete(remove)
  .put(validate(schema.orderUPDATE), update);

router.route("/:id/cancel").get(orderCancel);

module.exports = router;
