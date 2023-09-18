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
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const router = express.Router();

router
  .route("")
  .get(readAll)
  .post(authenticate, authorize(), validate(schema.menuPOST), create);

router.route("/:id/publish").get(authenticate, authorize(), menuPublish);
router.route("/:id/unpublish").get(authenticate, authorize(), menuUnpublish);

router
  .route("/:id")
  .get(read)
  .delete(authenticate, authorize(), remove)
  .put(authenticate, authorize(), validate(schema.menuUpdate), update);

module.exports = router;
