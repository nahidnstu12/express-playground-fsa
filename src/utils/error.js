class CustomError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = this.constructor.name;
    this.code = status;
  }
}

exports.notFound = (msg = "Resource not found") => {
  return new CustomError(msg, 404);
};

exports.badRequest = (msg = "Bad Request") => {
  return new CustomError(msg, 400);
};

exports.serverError = (msg = "Internal Server Error") => {
  return new CustomError(msg, 500);
};

exports.authenticationError = (msg = "Authentication Failed") => {
  return new CustomError(msg, 401);
};

exports.authorizationError = (msg = "Permission Denied") => {
  return new CustomError(msg, 403);
};
