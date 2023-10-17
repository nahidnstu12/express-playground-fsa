const express = require("express");
const {
  create,
  read,
  readAll,
  update,
  delete: remove,
  menuChangePublishStatus,
  testing,
} = require("../controller/menu");
const {USER_ROLES} = require("../utils/constants");
const schema = require("../model/validation/menu");
const validate = require("../middleware/validate");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const optionalAuthorize = require("../middleware/optional-authorize");

const router = express.Router();

router
  .route("")
  .get(optionalAuthorize, readAll)
  .post(authenticate, authorize([USER_ROLES.ADMIN]), validate(schema.menuPOST), create);

router
  .route("/:id/changeStatus")
  .get(authenticate, authorize([USER_ROLES.ADMIN]), menuChangePublishStatus);

router
  .route("/:id")
  .get(read)
  .delete(authenticate, authorize([USER_ROLES.ADMIN]), remove)
  .put(authenticate, authorize([USER_ROLES.ADMIN]), validate(schema.menuUpdate), update);

// only for testing coverage
router.route("/testing").post(authenticate, authorize([USER_ROLES.ADMIN]), testing);

module.exports = router;
