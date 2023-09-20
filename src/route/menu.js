const express = require("express");
const {
  create,
  read,
  readAll,
  update,
  delete: remove,
  menuChangePublishStatus,
} = require("../controller/menu");
const schema = require("../model/validation/menu");
const validate = require("../middleware/validate");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const optionalAuthorize = require("../middleware/optional-authorize");

const router = express.Router();

router
  .route("")
  .get(optionalAuthorize, readAll)
  .post(authenticate, authorize(["admin"]), validate(schema.menuPOST), create);

router
  .route("/:id/changeStatus")
  .get(authenticate, authorize(["admin"]), menuChangePublishStatus);

router
  .route("/:id")
  .get(read)
  .delete(authenticate, authorize(["admin"]), remove)
  .put(authenticate, authorize(["admin"]), validate(schema.menuUpdate), update);

module.exports = router;
