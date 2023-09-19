const express = require("express");
const { register, login, profile } = require("../controller/auth");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router
  .route("/profile")
  .get(
    authenticate,
    authorize(["app_admin", "admin", "customer", "chef", "delivary_boy"]),
    profile,
  );

module.exports = router;
