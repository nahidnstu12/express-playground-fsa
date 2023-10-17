const express = require("express");
const {
  create,
  read,
  readAll,
  update,
  delete: remove,
  userApprove,
  testing,
} = require("../controller/user");
const schema = require("../model/validation/user");
const validate = require("../middleware/validate");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const {USER_ROLES} = require("../utils/constants");

const router = express.Router();

router
  .route("")
  .get(authenticate, authorize([USER_ROLES.APP_ADMIN]), readAll)
  .post(
    authenticate,
    authorize([USER_ROLES.APP_ADMIN]),
    validate(schema.userPOST),
    create,
  );
router
  .route("/:id")
  .get(authenticate, authorize([USER_ROLES.APP_ADMIN, USER_ROLES.ADMIN]), read)
  .delete(authenticate, authorize([USER_ROLES.APP_ADMIN]), remove)
  .put(
    authenticate,
    authorize([USER_ROLES.APP_ADMIN, USER_ROLES.ADMIN]),
    validate(schema.userUpdate),
    update,
  );

router
  .route("/:id/changeApproval")
  .get(authenticate, authorize([USER_ROLES.APP_ADMIN]), userApprove);

// only for testing coverage
router.route("/testing").post(testing);

module.exports = router;
