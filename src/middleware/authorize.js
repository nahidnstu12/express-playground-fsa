const authorize =
  (roles = ["app_admin"]) =>
  (req, _res, next) => {
    console.log("User", req.user);
    if (roles.includes(req.user.role)) {
      return next();
    }

    return next({
      status: 403,
      message: "You have not permission to do this",
    });
  };

module.exports = authorize;
