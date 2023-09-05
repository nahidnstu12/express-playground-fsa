const express = require("express");
const { register, login, profile } = require("../controller/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile").post(profile);

module.exports = router;
