const { createUser } = require("../service/user");

const controller = {};

controller.register = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({
      status: "Success",
      data: user,
    });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({
        status: "fail",
        message: "User Already exists.",
      });
    }
    next(err);
  }
};

controller.login = async (req, res, next) => {
  try {
    res.status(201).json({
      status: "Success",
      data: [],
    });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({
        status: "fail",
        message: "",
      });
    }
    next(err);
  }
};

controller.profile = async (req, res, next) => {
  try {
    res.status(201).json({
      status: "Success",
      data: [],
    });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({
        status: "fail",
        message: "",
      });
    }
    next(err);
  }
};

module.exports = controller;
