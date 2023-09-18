const jwt = require("jsonwebtoken");
const { findUserByEmailHandler } = require("../service/user");

const authenticate = async (req, _res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || null;
    if (!token) {
      next({
        status: 401,
        message: "Authentication Failed",
      });
    }

    const decodedUser = await jwt.verify(token, "hello-secret");
    const user = await findUserByEmailHandler(decodedUser.email);

    if (!user) {
      next({
        status: 401,
        message: "Authentication Failed",
      });
    }

    if (user.status !== "approved") {
      next({
        status: 401,
        message: `Your account is ${user.status}`,
      });
    }

    req.user = { ...user, id: user.id };
    next();
  } catch (e) {
    next({
      status: 401,
      message: "Authentication Failed",
    });
  }
};

module.exports = authenticate;
