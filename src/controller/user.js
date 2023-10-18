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
const {USER_STATUS} = require("../utils/constants");

const controller = {};

controller.create = async (req, res, next) => {
  try {
    const { name, email, phone, password, status, role, id } = req.body;
    const userResponse = await createUserHandler({ name, email, phone, password, status, role, id });
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

controller.testing = async (req, res, next) => {
  try {
    const { name, email, phone, password, status, role, id } = req.body;
    const userResponse = await createUserHandler({ name, email, phone, password, status, role, id });
    if (!userResponse) {
      next(badRequest("user already exists"));
    }
    return res.status(201).json(
      successResponse({
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
    if(!userResponse){
      next(notFound("user not found"));
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
    const userResponse = await updateUserHandler(req.params.id, req.body);

    if (userResponse) {
      return res.status(200).json(
        successResponse({
          message: "Successfully updated",
          data: userResponse,
        }),
      );
    } else {
      next(notFound("user not found"));
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
    const userResponse = await approveUserHandler(req.params.id, approvalStatus);

    if (userResponse) {
      const status = userResponse?.status === 400 ? 400 : 200;
      return res.status(status).json(
        successResponse({
          status: status,
          message:
            userResponse.message ||
            `userResponse ${
              approvalStatus === USER_STATUS.APPROVED ? "Approved" : "Blocked"
            } Successfully`,
        }),
      );
    } else {
      next(notFound(userResponse.message || "user not found"));
    }
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
