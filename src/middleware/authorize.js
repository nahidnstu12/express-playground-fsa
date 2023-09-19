const authorize =
  (roles = ["app_admin"]) =>
  (req, _res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    }
    console.log("authorization role", roles);
    return next({
      status: 403,
      message: "You have not permission to do this",
    });
  };

module.exports = authorize;
