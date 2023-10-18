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
const { USER_STATUS } = require("../utils/constants");
const { getKeyByValue } = require("../utils/helpers");

const controller = {};

controller.create = async (req, res, next) => {
  try {
    const { name, email, phone, password, status, role, id } = req.body;
    const userResponse = await createUserHandler({
      name,
      email,
      phone,
      password,
      status,
      role,
      id,
    });
    if (!userResponse) {
      next(badRequest("User already exists"));
    }

    return res.status(201).json(
      successResponse({
        code: 201,
        message: "User created successfully",
        data: userResponse,
      }),
    );
  } catch (err) {
    next(err);
  }
};

// only use for testing-coverage purposes
controller.testing = async (req, res, next) => {
  try {
    const { name, email, phone, password, status, role, id } = req.body;
    const userResponse = await createUserHandler({
      name,
      email,
      phone,
      password,
      status,
      role,
      id,
    });
    if (!userResponse) {
      next(badRequest("user already exists"));
    }
    return res.status(201).json(
      successResponse({
        code: 201,
        message: "User created successfully",
        data: userResponse,
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
    const userResponse = await readUserHandler(id);
    if (!userResponse) {
      next(notFound("User not found"));
    }
    return res.status(200).json(
      successResponse({
        data: userResponse,
      }),
    );
  } catch (err) {
    next(err);
  }
};

controller.update = async (req, res, next) => {
  try {
    const { name, phone, status, role } = req.body;
    const userResponse = await updateUserHandler(req.params.id, {
      name,
      phone,
      status,
      role,
    });

    if (userResponse) {
      return res.status(200).json(
        successResponse({
          message: "User updated successfully",
          data: userResponse,
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
        message: "User deleted successfully",
      }),
    );
  } catch (err) {
    next(err);
  }
};

controller.userApprove = async (req, res, next) => {
  try {
    const approvalStatus = Number(req.query.approve);
    if (!approvalStatus) {
      next(badRequest("Provide approval status"));
    }
    const userResponse = await approveUserHandler(
      req.params.id,
      approvalStatus,
    );
    console.log("user userApprove", userResponse);
    if (userResponse) {
      const status = userResponse?.code === 400 ? 400 : 200;
      return res.status(status).json(
        successResponse({
          code: status,
          message:
            userResponse.message ||
            `User ${getKeyByValue(USER_STATUS, approvalStatus)} Successfully`,
        }),
      );
    } else {
      next(notFound(userResponse.message || "User not found"));
    }
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
