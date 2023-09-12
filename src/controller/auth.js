const {
  registerHandler,
  loginHandler,
  profileHandler,
} = require("../service/auth");

const controller = {};

controller.register = async (req, res, next) => {
  try {
    const user = await registerHandler(req.body);
    console.log("user response", user);
    if (user.status === 400) {
      return res.status(400).json({
        status: "fail",
        message: user.message,
      });
    } else if (user.status === 201) {
      return res.status(201).json({
        status: "Success",
        data: user,
      });
    } else {
      return res.status(500).json({
        status: "fail",
        message: "Internal Server Error",
      });
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
      return res.status(400).json({
        status: "fail",
        message: user.message,
      });
    } else if (user.status === 200) {
      return res.status(200).json({
        status: "Success",
        data: user,
      });
    } else {
      return res.status(500).json({
        status: "fail",
        message: "Internal Server Error",
      });
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
      return res.status(401).json({
        status: "fail",
        message: user.message,
      });
    } else if (user.status === 400) {
      return res.status(400).json({
        status: "fail",
        message: user.message,
      });
    } else if (user.status === 200) {
      return res.status(200).json({
        status: "Success",
        data: user,
      });
    } else {
      return res.status(500).json({
        status: "fail",
        message: "Internal Server Error",
      });
    }
  } catch (err) {
    console.log("profile failed");
    next(err);
  }
};

module.exports = controller;
