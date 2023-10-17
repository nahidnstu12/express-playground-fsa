const jwt = require("jsonwebtoken");
const { findUserByEmailHandler } = require("../service/user");
const { jwtVerify } = require("../tests/utils");
const { USER_STATUS } = require("../utils/constants");

const authenticate = async (req, _res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || null;

    if (!token) {
      // console.log("token not found");
      next({
        status: 401,
        message: "Authentication Failed",
      });
    }

    const decodedUser = jwtVerify(token);

    const user = await findUserByEmailHandler(decodedUser.email);
    if (!user) {
      next({
        status: 401,
        message: "Authentication Failed",
      });
    }

    if (user.status !== USER_STATUS.APPROVED) {
      next({
        status: 401,
        message: `Your account is ${user.status}`,
      });
    }
    // console.log({decode: decodedUser.email, user})
    req.user = { ...user };
    next();
  } catch (e) {
    console.log(e);
    console.log("authentication failed in catch", e.message);
    next({
      status: 401,
      message: e.message || "Authentication Failed",
    });
  }
};

module.exports = authenticate;
