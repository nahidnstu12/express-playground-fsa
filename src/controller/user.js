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
    if (!user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    return res.status(201).json({
      message: "Success",
      data: user,
    });
  } catch (err) {
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
    next(err);
  }
};

controller.userApprove = async (req, res, next) => {
  try {
    const approvalStatus = req.query.approve;
    const user = await approveUserHandler(req.params.id, approvalStatus);

    if (user) {
      return res.status(200).json({
        message: `User ${
          approvalStatus === "1" ? "Approved" : "Blocked"
        } Successfully`,
      });
    } else {
      return res.status(404).json({
        status: "User not found",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
