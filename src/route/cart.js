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

router.route("").get(readAll).post(create);

router.route("/:id").get(read).delete(remove).put(update);
router.route("/:id/cancel").get(cancelCart);

module.exports = router;
