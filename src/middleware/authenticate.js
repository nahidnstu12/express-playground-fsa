const jwt = require("jsonwebtoken");
const { findUserByEmailHandler } = require("../service/user");

const authenticate = async (req, _res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || null;

    if (!token) {
      console.log("token not found");
      next({
        status: 401,
        message: "Authentication Failed",
      });
    }

    const decodedUser = await jwt.verify(token, "hello-secret");
    const user = await findUserByEmailHandler(decodedUser.email);
    if (!user) {
      console.log("user not found");
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
    req.user = { ...user };
    next();
  } catch (e) {
    console.log("authentication failed in catch", e.message);
    next({
      status: 401,
      message: e.message || "Authentication Failed",
    });
  }
};

module.exports = authenticate;
