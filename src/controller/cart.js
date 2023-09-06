const {
  cancelCartHandler,
  readCartHandler,
  createCartHandler,
  deleteCartHandler,
  readAllCartHandler,
  updateCartHandler,
} = require("../service/cart");

const controller = {};

controller.create = async (req, res, next) => {
  try {
    const cart = await createCartHandler(req.body);
    res.status(201).json({
      status: "Success",
      data: cart,
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

controller.readAll = async (req, res, next) => {
  try {
    const carts = await readAllCartHandler();
    res.status(200).json({
      status: "Success",
      data: carts,
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
    const cart = await readCartHandler(id);
    res.status(200).json({
      status: "Success",
      data: cart,
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
    const cart = await updateCartHandler(req.params.id, req.body);

    if (cart) {
      return res.status(200).json({
        message: "Successfully updated",
        data: cart,
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
    await deleteCartHandler(req.params.id);
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

controller.cancelCart = async (req, res, next) => {
  try {
    await cancelCartHandler(req.params.id);
    res.status(200).json({
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
