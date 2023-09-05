const express = require("express");
const {
  create,
  read,
  readAll,
  update,
  delete: remove,
  menuPublish,
  menuUnpublish,
} = require("../controller/menu");

const router = express.Router();

router.route("/menus").get(readAll).post(create);

router.route("/menus/:id/publish").get(menuPublish);
router.route("/menus/:id/unpublish").get(menuUnpublish);

router.route("/menus/:id").get(read).delete(remove).put(update);

module.exports = router;
