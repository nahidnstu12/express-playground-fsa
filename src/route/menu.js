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
const schema = require("../model/validation/menu");
const validate = require("../middleware/validate");

const router = express.Router();

router.route("").get(readAll).post(validate(schema.menuPOST), create);

router.route("/:id/publish").get(menuPublish);
router.route("/:id/unpublish").get(menuUnpublish);

router
  .route("/:id")
  .get(read)
  .delete(remove)
  .put(validate(schema.menuPOST), update);

module.exports = router;
