const express = require("express");
const { register, login, profile } = require("../controller/auth");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const schema = require("../model/validation/auth");
const validate = require("../middleware/validate");
const {USER_ROLES} = require("../utils/constants");

const router = express.Router();

router.route("/register").post(validate(schema.register),register);
router.route("/login").post(validate(schema.login),login);
router
  .route("/profile")
  .get(
    authenticate,
    authorize(Object.values(USER_ROLES)),
    profile,
  );

module.exports = router;
