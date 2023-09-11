const {
  cancelOrderHandler,
  createOrderHandler,
  deleteOrderHandler,
  readAllOrderHandler,
  readOrderHandler,
  updateOrderHandler,
} = require("../service/order");

const controller = {};

controller.create = async (req, res, next) => {
  try {
    const order = await createOrderHandler(req.body);
    res.status(201).json({
      status: "Success",
      data: order,
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
    const orders = await readAllOrderHandler();
    res.status(200).json({
      message: "Success",
      data: orders,
      total: orders.length,
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
    const order = await readOrderHandler(id);
    res.status(200).json({
      message: "Success",
      data: order,
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
    const order = await updateOrderHandler(req.params.id, req.body);

    if (order) {
      return res.status(200).json({
        message: "Successfully updated",
        data: order,
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
    await deleteOrderHandler(req.params.id);
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

controller.orderCancel = async (req, res, next) => {
  try {
    await cancelOrderHandler(req.params.id);
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

module.exports = controller;
