const express = require("express");
const {
  create,
  read,
  readAll,
  update,
  delete: remove,
  orderCancel,
} = require("../controller/order");

const router = express.Router();

router.route("/orders").get(readAll).post(create);

router.route("/orders/:id").get(read).delete(remove).put(update);

router.route("/orders/:id/cancel").get(orderCancel);

module.exports = router;
