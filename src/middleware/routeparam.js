const { badRequest } = require("../utils/error");
const routeparam =
  (param = "id") =>
  (req, _res, next) => {
    const onlyDigitRegex = /^\d+$/;
    if (!onlyDigitRegex.test(req.params[param])) {
      return next(badRequest("Request params not valid"));
    }
    return next();
  };

module.exports = routeparam;
