const {badRequest} = require("../utils/error")
const bodyparse = (req, _res, next) => {
    console.log(req.body)
  if (!req.body) {
    return next(badRequest("Request body is undefined"));
  }
  return next();
};

module.exports = bodyparse;
