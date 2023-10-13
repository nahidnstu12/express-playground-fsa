const {
  registerHandler,
  loginHandler,
  profileHandler,
} = require("../service/auth");
const {
  serverError,
  badRequest,
  authenticationError,
} = require("../utils/error");
const { successResponse } = require("../utils/success");

const controller = {};

controller.register = async (req, res, next) => {
  try {
    const user = await registerHandler(req.body);
    if (user.status === 400) {
      next(user);
    } else if (user.status === 201) {
      return res.status(201).json(successResponse({ data: user }));
    } else {
      next(serverError());
    }
  } catch (err) {
    console.log("register failed");
    next(err);
  }
};

controller.login = async (req, res, next) => {
  try {
    const user = await loginHandler(req.body);

    if (user.status === 400) {
      next(badRequest(user.message));
    } else if (user.status === 200) {
      return res.status(200).json(successResponse({ data: user }));
    } else {
      next(serverError());
    }
  } catch (err) {
    console.log("login failed");
    next(err);
  }
};

controller.profile = async (req, res, next) => {
  try {
    const user = await profileHandler(req?.headers?.authorization || "");

    if (user.status === 401) {
      next(authenticationError(user.message));
    } else if (user.status === 400) {
      next(badRequest(user.message));
    } else if (user.status === 200) {
      return res.status(200).json(successResponse({ data: user }));
    } else {
      next(serverError());
    }
  } catch (err) {
    console.log("profile failed");
    next(err);
  }
};

module.exports = controller;
