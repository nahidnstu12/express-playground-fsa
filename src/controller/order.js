const {
  cancelOrderHandler,
  createOrderHandler,
  deleteOrderHandler,
  readAllOrderHandler,
  readOrderHandler,
  updateOrderHandler,
  orderStatusHandler,
} = require("../service/order");
const { getKeyByValue, paginateObject } = require("../utils/helpers");
const { ORDER_STATUS } = require("../utils/constants");
const { successResponse } = require("../utils/success");
const { notFound, badRequest } = require("../utils/error");

const controller = {};

controller.create = async (req, res, next) => {
  try {
    const {
      id,
      menuId,
      userId,
      order_date,
      order_type,
      quantity,
      price,
      order_status,
      payment_status,
    } = req.body;
    const orderResponse = await createOrderHandler({
      body: {
        id,
        menuId,
        userId,
        order_date,
        order_type,
        quantity,
        price,
        order_status,
        payment_status,
      },
      user: { userId: req.user.id },
    });
    const status = orderResponse?.code === 400 ? 400 : 201;

    if (orderResponse?.code === 400) {
      return next(badRequest(orderResponse.message));
    }
    return res.status(status).json(
      successResponse({
        code: orderResponse.code,
        data: orderResponse,
      }),
    );
  } catch (err) {
    next(err);
  }
};

controller.readAll = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const ordersResponse = await readAllOrderHandler(req.user, { page, limit });
    res.status(200).json(
      successResponse({
        data: ordersResponse.items,
        meta: paginateObject({
          page,
          limit,
          itemCount: ordersResponse.itemCount,
        }),
      }),
    );
  } catch (err) {
    next(err);
  }
};

controller.read = async (req, res, next) => {
  try {
    const id = req.params.id;
    const orderResponse = await readOrderHandler(id, req.user);
    if (!orderResponse) {
      return next(notFound("Order not found"));
    }
    return res.status(200).json(
      successResponse({
        data: orderResponse,
      }),
    );
  } catch (err) {
    next(err);
  }
};

controller.update = async (req, res, next) => {
  try {
    const {
      order_type,
      quantity,
      price,
      order_status,
      payment_status,
      order_date,
    } = req.body;
    const orderResponse = await updateOrderHandler(
      req.params.id,
      { order_type, quantity, price, order_status, payment_status, order_date },
      req.user,
    );
    if (!orderResponse) {
      next(notFound("Order not found"));
    } else {
      return res.status(200).json(
        successResponse({
          message: "Successfully updated",
          data: orderResponse,
        }),
      );
    }
  } catch (err) {
    next(err);
  }
};

controller.changeOrderStatus = async (req, res, next) => {
  try {
    const orderStatus = +req.query.order_status;

    if (!orderStatus) {
      next(badRequest("Provide valid order status"));
    }
    const orderResponse = await orderStatusHandler(
      req.params.id,
      orderStatus,
      req.user,
    );
    const status = orderResponse?.code === 400 ? 400 : 200;
    // console.log({ orderResponse });
    if (status === 400) {
      return next(badRequest(orderResponse.message));
    } else {
      return res.status(status).json(
        successResponse({
          message:
            orderResponse.message ||
            `orderResponse is now ${getKeyByValue(ORDER_STATUS, orderStatus)} `,
        }),
      );
    }
  } catch (err) {
    next(err);
  }
};

controller.delete = async (req, res, next) => {
  try {
    const orderResponse = await deleteOrderHandler(req.params.id);
    if (!orderResponse) {
      return next(notFound("Order not found"));
    }
    res.status(200).json(
      successResponse({
        message: "Successfully deleted",
      }),
    );
  } catch (err) {
    next(err);
  }
};

// less important
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
