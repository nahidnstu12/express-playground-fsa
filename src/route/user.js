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

const router = express.Router();

router.route("").get(readAll).post(create);
router.route("/:id").get(read).delete(remove).put(update);

router.route("/:id/approve").get(userApprove);

router.route("/:id/blocked").get(userBlocked);

module.exports = router;
