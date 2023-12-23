const express = require("express");
const {
  create,
  read,
  readAll,
  update,
  delete: remove,
  menuChangePublishStatus,
  menuBulkUpload,
  testing,
} = require("../controller/menu");
const { USER_ROLES } = require("../utils/constants");
const schema = require("../model/validation/menu");
const validate = require("../middleware/validate");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const optionalAuthorize = require("../middleware/optional-authorize");
const routeparam = require("../middleware/routeparam");

const xlsx = require("xlsx");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

// Middleware functions
const adminAuth = [authenticate, authorize([USER_ROLES.ADMIN])];

router
  .route("")
  .get(optionalAuthorize, readAll)
  .post(adminAuth, validate(schema.menuPOST), create);

router
  .route("/:id/changeStatus")
  .get(routeparam(), adminAuth, menuChangePublishStatus);

router
  .route("/:id")
  .get(routeparam(), read)
  .delete(routeparam(), adminAuth, remove)
  .put(routeparam(), adminAuth, validate(schema.menuUpdate), update);

router.post(
  "/bulk-upload",
  // validate(schema.menuBulkUpload, "file"),
  adminAuth,
  upload.single("filename"),
  menuBulkUpload,
);

// only for testing coverage
router.route("/testing").post(adminAuth, testing);

module.exports = router;
