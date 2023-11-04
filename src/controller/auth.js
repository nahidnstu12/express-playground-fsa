const {
  registerHandler,
  loginHandler,
  profileHandler,registerAppAdminHandler
} = require("../service/auth");
const {
  serverError,
  badRequest,
  authenticationError,
} = require("../utils/error");
const { successResponse } = require("../utils/success");

const controller = {};

controller.registerAppAdmin = async (req, res, next) => {
  try {
    const { name, email, phone, password, status, role, id } = req.body;
    const userResponse = await registerAppAdminHandler({
      name,
      email,
      phone,
      password,
      status,
      role,
      id,
    });
    if (userResponse.code === 400) {
      next(userResponse);
    } else if (userResponse.code === 201) {
      return res.status(201).json(
        successResponse({
          code: 201,
          data: { message: userResponse.message, token: userResponse.token },
        }),
      );
    } else {
      next(serverError());
    }
  } catch (err) {
    console.log("register failed");
    next(err);
  }
};

controller.register = async (req, res, next) => {
  try {
    const { name, email, phone, password, status, role, id } = req.body;
    const userResponse = await registerHandler({
      name,
      email,
      phone,
      password,
      status,
      role,
      id,
    });
    if (userResponse.code === 400) {
      next(userResponse);
    } else if (userResponse.code === 201) {
      return res.status(201).json(
        successResponse({
          code: 201,
          data: { message: userResponse.message, token: userResponse.token },
        }),
      );
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
    const { email, password } = req.body;
    const userResponse = await loginHandler({ email, password });

    if (userResponse.code === 400) {
      next(badRequest(userResponse.message));
    } else if (userResponse.code === 200) {
      return res.status(200).json(
        successResponse({
          code: 200,
          data: { message: userResponse.message, token: userResponse.token },
        }),
      );
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
    const userResponse = await profileHandler(
      req?.headers?.authorization || "",
    );

    if (userResponse.code === 401) {
      next(authenticationError(userResponse.message));
    } else if (userResponse.code === 400) {
      next(badRequest(userResponse.message));
    } else if (userResponse.code === 200) {
      return res.status(200).json(successResponse({ data: userResponse }));
    } else {
      next(serverError());
    }
  } catch (err) {
    console.log("profile fetch failed");
    next(err);
  }
};

module.exports = controller;
