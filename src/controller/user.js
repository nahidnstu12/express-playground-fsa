const {
  createUserHandler,
  readAllUserHandler,
  approveUserHandler,
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
      status: "Success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

controller.testing = async (req, res, next) => {
  try {
    const user = await createUserHandler(req.body);
    if (!user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    return res.status(201).json({
      status: "Success",
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
      status: "Success",
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
      status: "Success",
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
        message: "User not found",
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
    if (!approvalStatus) {
      return res.status(400).json({
        status: 400,
        message: "Provide approval status",
      });
    }
    const user = await approveUserHandler(req.params.id, approvalStatus);

    if (user) {
      const status = user?.status === 400 ? 400 : 200;
      return res.status(status).json({
        status: status,
        message:
          user.message ||
          `User ${
            approvalStatus === "1" ? "Approved" : "Blocked"
          } Successfully`,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: user.message || "User not found",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
