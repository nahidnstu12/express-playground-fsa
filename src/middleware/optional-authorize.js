const jwt = require("jsonwebtoken");
const { findUserByEmailHandler } = require("../service/user");
const optionalAuthorize = async (req, _res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || null;

    if (!token) {
      req.user = { role: "public" };
      return next();
    }

    const decodedUser = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUserByEmailHandler(decodedUser.email);
    if (!user) {
      console.log("user not found");
      return next({
        status: 401,
        message: "Authentication Failed",
      });
    }

    if (user.status !== "approved") {
      return next({
        status: 401,
        message: `Your account is ${user.status}`,
      });
    }
    req.user = { ...user };
    return next();
  } catch (e) {
    console.log("authentication failed in catch", e.message);
    next({
      status: 401,
      message: e.message || "Authentication Failed",
    });
  }
};

module.exports = optionalAuthorize;
