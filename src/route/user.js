const express = require("express");
const {
  create,
  read,
  readAll,
  update,
  delete: remove,
  userApprove,
  userBlocked,
} = require("../controller/user");
const schema = require("../model/validation/user");
const validate = require("../middleware/validate");

const router = express.Router();

router.route("").get(readAll).post(validate(schema.userPOST), create);
router
  .route("/:id")
  .get(read)
  .delete(remove)
  .put(validate(schema.userPOST), update);

router.route("/:id/approved").get(userApprove);

router.route("/:id/blocked").get(userBlocked);

module.exports = router;
