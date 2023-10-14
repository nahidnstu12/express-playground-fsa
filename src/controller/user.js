const {
  createUserHandler,
  readAllUserHandler,
  approveUserHandler,
  deleteUserHandler,
  readUserHandler,
  updateUserHandler,
} = require("../service/user");
const { badRequest, notFound } = require("../utils/error");
const { successResponse } = require("../utils/success");

const controller = {};

controller.create = async (req, res, next) => {
  try {
    const user = await createUserHandler(req.body);
    if (!user) {
      next(badRequest("User already exists"));
    }

    return res.status(201).json(
      successResponse({
        data: user,
      }),
    );
  } catch (err) {
    next(err);
  }
};

controller.testing = async (req, res, next) => {
  try {
    const user = await createUserHandler(req.body);
    if (!user) {
      next(badRequest("User already exists"));
    }
    return res.status(201).json(
      successResponse({
        data: user,
      }),
    );
  } catch (err) {
    next(err);
  }
};

controller.readAll = async (req, res, next) => {
  try {
    const users = await readAllUserHandler();
    res.status(200).json(
      successResponse({
        data: users,
      }),
    );
  } catch (err) {
    console.log("error ", err);

    next(err);
  }
};

controller.read = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await readUserHandler(id);
    if(!user){
      next(notFound("User not found"));
    }
    return res.status(200).json(
      successResponse({
        data: user,
      }),
    );
  } catch (err) {
    next(err);
  }
};

controller.update = async (req, res, next) => {
  try {
    const user = await updateUserHandler(req.params.id, req.body);

    if (user) {
      return res.status(200).json(
        successResponse({
          message: "Successfully updated",
          data: user,
        }),
      );
    } else {
      next(notFound("User not found"));
    }
  } catch (err) {
    next(err);
  }
};

controller.delete = async (req, res, next) => {
  try {
    await deleteUserHandler(req.params.id);
    res.status(200).json(
      successResponse({
        message: "Successfully deleted",
      }),
    );
  } catch (err) {
    next(err);
  }
};

controller.userApprove = async (req, res, next) => {
  try {
    const approvalStatus = req.query.approve;
    if (!approvalStatus) {
      next(badRequest("Provide approval status"));
    }
    const user = await approveUserHandler(req.params.id, approvalStatus);

    if (user) {
      const status = user?.status === 400 ? 400 : 200;
      return res.status(status).json(
        successResponse({
          status: status,
          message:
            user.message ||
            `User ${
              approvalStatus === "1" ? "Approved" : "Blocked"
            } Successfully`,
        }),
      );
    } else {
      next(notFound(user.message || "User not found"));
    }
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
