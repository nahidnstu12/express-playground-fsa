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

router.route("").get(readAll).post(create);

router.route("/:id/publish").get(menuPublish);
router.route("/:id/unpublish").get(menuUnpublish);

router.route("/:id").get(read).delete(remove).put(update);

module.exports = router;
