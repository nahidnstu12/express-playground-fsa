const express = require("express");
const {
  create,
  read,
  readAll,
  update,
  delete: remove,
  userApprove,
} = require("../controller/user");
const schema = require("../model/validation/user");
const validate = require("../middleware/validate");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const router = express.Router();

router
  .route("")
  .get(authenticate, authorize(["app_admin"]), readAll)
  .post(
    authenticate,
    authorize(["app_admin"]),
    validate(schema.userPOST),
    create,
  );
router
  .route("/:id")
  .get(authenticate, authorize(["app_admin"]), read)
  .delete(authenticate, authorize(["app_admin"]), remove)
  .put(
    authenticate,
    authorize(["app_admin"]),
    validate(schema.userUpdate),
    update,
  );

router
  .route("/:id/changeApproval")
  .get(authenticate, authorize(["app_admin"]), userApprove);

// router
//   .route("/:id/blocked")
//   .get(authenticate, authorize(["app_admin"]), userBlocked);

module.exports = router;
