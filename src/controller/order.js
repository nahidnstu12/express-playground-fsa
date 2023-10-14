const {
  cancelOrderHandler,
  createOrderHandler,
  deleteOrderHandler,
  readAllOrderHandler,
  readOrderHandler,
  updateOrderHandler,
  orderStatusHandler,
} = require("../service/order");
const { getKeyByValue } = require("../utils/helpers");
const { ORDER_STATUS } = require("../utils/constants");
const { successResponse } = require("../utils/success");
const { notFound, badRequest } = require("../utils/error");

const controller = {};

controller.create = async (req, res, next) => {
  try {
    const order = await createOrderHandler({
      body: req.body,
      user: { userId: req.user.id },
    });
    const status = order?.status === 400 ? 400 : 201;

    res.status(status).json(
      successResponse({
        data: order,
      }),
    );
  } catch (err) {
    next(err);
  }
};

controller.readAll = async (req, res, next) => {
  try {
    const orders = await readAllOrderHandler(req.user);
    res.status(200).json(
      successResponse({
        data: orders,
      }),
    );
  } catch (err) {
    next(err);
  }
};

controller.read = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await readOrderHandler(id, req.user);
    if (!order) {
      next(notFound("Order not found"));
    }
    return res.status(200).json(
      successResponse({
        data: order,
      }),
    );
  } catch (err) {
    next(err);
  }
};

controller.update = async (req, res, next) => {
  try {
    const order = await updateOrderHandler(req.params.id, req.body, req.user);
    if (order) {
      return res.status(200).json(
        successResponse({
          message: "Successfully updated",
          data: order,
        }),
      );
    } else {
      next(notFound("Order not found"));
      // return res.status(404).json({
      //   status: "Order not found",
      // });
    }
  } catch (err) {
    next(err);
  }
};

controller.changeOrderStatus = async (req, res, next) => {
  try {
    const orderStatus = req.query.order_status;
    if (!orderStatus) {
      next(badRequest("Provide valid order status status"));
      // return res.status(400).json({
      //   message: "Provide valid order status status",
      // });
    }
    const order = await orderStatusHandler(
      req.params.id,
      orderStatus,
      req.user,
    );
    const status = order?.status === 400 ? 400 : 200;
    return res.status(status).json(
      successResponse({
        message:
          order.message ||
          `order is now ${getKeyByValue(ORDER_STATUS, orderStatus)} `,
      }),
    );
  } catch (err) {
    next(err);
  }
};

controller.delete = async (req, res, next) => {
  try {
    await deleteOrderHandler(req.params.id);
    res.status(200).json(
      successResponse({
        message: "Successfully deleted",
      }),
    );
  } catch (err) {
    next(err);
  }
};

controller.orderCancel = async (req, res, next) => {
  try {
    await cancelOrderHandler(req.params.id);
    res.status(200).json(
      successResponse({
        message: "Successfully deleted",
      }),
    );
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
