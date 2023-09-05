const express = require("express");
const {
  create,
  read,
  readAll,
  update,
  delete: remove,
  cancelCart,
} = require("../controller/cart");

const router = express.Router();

router.route("/carts").get(readAll).post(create);

router.route("/carts/:id").get(read).delete(remove).put(update);
router.route("/carts/:id/cancel").get(cancelCart);

module.exports = router;
