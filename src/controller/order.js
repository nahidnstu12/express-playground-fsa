const {
  cancelOrderHandler,
  createOrderHandler,
  deleteOrderHandler,
  readAllOrderHandler,
  readOrderHandler,
  updateOrderHandler,
  orderStatusHandler,
} = require("../service/order");

const controller = {};

controller.create = async (req, res, next) => {
  try {
    const order = await createOrderHandler({
      body: req.body,
      user: { userId: req.user.id },
    });
    const status = order?.status === 400 ? 400 : 201;
    res.status(status).json({
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

controller.readAll = async (req, res, next) => {
  try {
    const orders = await readAllOrderHandler(req.user);
    res.status(200).json({
      message: "Success",
      data: orders,
      total: orders.length,
    });
  } catch (err) {
    next(err);
  }
};

controller.read = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await readOrderHandler(id, req.user);
    res.status(200).json({
      message: "Success",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

controller.update = async (req, res, next) => {
  try {
    const order = await updateOrderHandler(req.params.id, req.body, req.user);
    if (order) {
      return res.status(200).json({
        message: "Successfully updated",
        data: order,
      });
    } else {
      return res.status(404).json({
        status: "Order not found",
      });
    }
  } catch (err) {
    next(err);
  }
};

controller.changeOrderStatus = async (req, res, next) => {
  try {
    const orderStatus = req.query.order_status;
    if (!orderStatus) {
      return res.status(400).json({
        message: "Provide valid order status status",
      });
    }
    const order = await orderStatusHandler(
      req.params.id,
      orderStatus,
      req.user,
    );
    const status = order?.status === 400 ? 400 : 200;
    return res.status(status).json({
      message: order.message || `order is now ${orderStatus} `,
    });
  } catch (err) {
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
    next(err);
  }
};

module.exports = controller;
