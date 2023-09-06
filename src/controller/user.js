const {
  createUserHandler,
  readAllUserHandler,
  approveUserHandler,
  blockUserHandler,
  deleteUserHandler,
  readUserHandler,
  updateUserHandler,
} = require("../service/user");

const controller = {};

controller.create = async (req, res, next) => {
  try {
    const user = await createUserHandler(req.body);
    res.status(201).json({
      message: "Success",
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

controller.readAll = async (req, res, next) => {
  try {
    const users = await readAllUserHandler();
    res.status(200).json({
      message: "Success",
      data: users,
      total: users.length,
    });
  } catch (err) {
    console.log("error ", err);
    if (err.code === "23505") {
      return res.status(409).json({
        status: "fail",
        message: "",
      });
    }
    next(err);
  }
};

controller.read = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await readUserHandler(id);
    res.status(200).json({
      message: "Success",
      data: user,
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

controller.update = async (req, res, next) => {
  try {
    const user = await updateUserHandler(req.params.id, req.body);

    if (user) {
      return res.status(200).json({
        message: "Successfully updated",
        data: user,
      });
    } else {
      return res.status(404).json({
        status: "User not found",
      });
    }
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

controller.delete = async (req, res, next) => {
  try {
    await deleteUserHandler(req.params.id);
    res.status(200).json({
      message: "Successfully deleted",
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

controller.userApprove = async (req, res, next) => {
  try {
    const user = await approveUserHandler(req.params.id);

    if (user) {
      return res.status(200).json({
        message: "User Approved Successfully",
      });
    } else {
      return res.status(404).json({
        status: "User not found",
      });
    }
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
controller.userBlocked = async (req, res, next) => {
  try {
    const user = await blockUserHandler(req.params.id);

    if (user) {
      return res.status(200).json({
        message: "Blocked User Successfully",
      });
    } else {
      return res.status(404).json({
        status: "User not found",
      });
    }
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
