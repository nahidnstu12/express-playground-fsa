const jwt = require("jsonwebtoken");
const { findUserByEmailHandler } = require("../service/user");
const { jwtVerify } = require("../tests/utils");
const { USER_STATUS } = require("../utils/constants");
const { getKeyByValue } = require("../utils/helpers");

const authenticate = async (req, _res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || null;

    if (!token) {
      // console.log("token not found");
      next({
        code: 401,
        message: "Authentication Failed",
      });
    }

    const decodedUser = jwtVerify(token);

    const user = await findUserByEmailHandler(decodedUser.email);
    if (!user) {
      next({
        code: 401,
        message: "Authentication Failed",
      });
    }

    if (user.status !== USER_STATUS.APPROVED) {
      next({
        code: 401,
        message: `Your account is ${getKeyByValue(USER_STATUS, user.status)}`,
      });
    }
    // console.log({decode: decodedUser.email, user})
    req.user = { ...user };
    next();
  } catch (e) {
    console.log("authentication failed in catch", e.message);
    next({
      code: 401,
      message: e.message || "Authentication Failed",
    });
  }
};

module.exports = authenticate;
