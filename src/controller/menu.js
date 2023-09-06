const {
  createMenuHandler,
  readMenuHandler,
  deleteMenuHandler,
  publishMenuHandler,
  readAllMenuHandler,
  unpublishMenuHandler,
  updateMenuHandler,
} = require("../service/menu");
const {
  readUserHandler,
  updateUserHandler,
  deleteUserHandler,
} = require("../service/user");

const controller = {};

controller.create = async (req, res, next) => {
  try {
    const user = await createMenuHandler(req.body);
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

controller.readAll = async (req, res, next) => {
  try {
    const users = await readAllMenuHandler();
    res.status(200).json({
      message: "Success",
      data: users,
      total: users.length,
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
    const user = await updateMenuHandler(req.params.id, req.body);

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
    await deleteMenuHandler(req.params.id);
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

controller.menuPublish = async (req, res, next) => {
  try {
    await publishMenuHandler(req.params.id);
    res.status(200).json({
      message: "Successfully published",
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
controller.menuUnpublish = async (req, res, next) => {
  try {
    await unpublishMenuHandler(req.params.id);
    res.status(200).json({
      message: "Successfully unpublished",
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
