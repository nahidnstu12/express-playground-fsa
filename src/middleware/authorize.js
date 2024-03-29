const {USER_ROLES} = require("../utils/constants");
const {authorizationError} = require("../utils/error");
const authorize =
  (roles = [USER_ROLES.APP_ADMIN]) =>
  (req, _res, next) => {
      // console.log({roles, res:req.user.role})
    if (roles.includes(req.user.role)) {
      return next();
    }
    // console.log("authorization role", roles);
    return next(authorizationError("You do not have permission to perform this action."));
  };

module.exports = authorize;
