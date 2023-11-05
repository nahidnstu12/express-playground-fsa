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
const routeparam = require("../middleware/routeparam");
const { USER_ROLES } = require("../utils/constants");

const router = express.Router();
// Middleware functions
const appAdminAuth = [authenticate, authorize([USER_ROLES.APP_ADMIN])];
const adminAuth = [authenticate, authorize([USER_ROLES.APP_ADMIN, USER_ROLES.ADMIN])];


router
    .route("/")
    .get(appAdminAuth, readAll)
    .post(appAdminAuth, validate(schema.userPOST), create);

router
    .route("/:id")
    .get(routeparam(), adminAuth, read)
    .delete(routeparam(), appAdminAuth, remove)
    .put(routeparam(), adminAuth, validate(schema.userUpdate), update);

router
    .route("/:id/changeApproval")
    .get(routeparam(), appAdminAuth, userApprove);

// Testing coverage route
router.route("/testing").post(testing);

module.exports = router;
