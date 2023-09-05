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

router.route("/users").get(readAll).post(create);
router.route("/users/:id").get(read).delete(remove).put(update);

router.route("/users/:id/approve").get(userApprove);

router.route("/users/:id/blocked").get(userBlocked);

module.exports = router;
