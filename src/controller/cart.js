const {
  cancelCartHandler,
  readCartHandler,
  createCartHandler,
  deleteCartHandler,
  readAllCartHandler,
  updateCartHandler,
} = require("../service/cart");
const { successResponse } = require("../utils/success");
const { notFound, badRequest } = require("../utils/error");
const { paginateObject } = require("../utils/helpers");

const controller = {};

controller.create = async (req, res, next) => {
  try {
    const { id, price, quantity, menuId } = req.body;
    const cartResponse = await createCartHandler({
      body: { id, price, quantity, menuId },
      user: { userId: req.user.id },
    });
    const status = cartResponse?.code === 400 ? 400 : 201;
    if (cartResponse?.code === 400) {
      return next(badRequest(cartResponse.message));
    }
    res.status(status).json(
      successResponse({
        code: status,
        message: "Cart created successfully",
        data: cartResponse,
      }),
    );
  } catch (err) {
    next(err);
  }
};

controller.readAll = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const cartsResponse = await readAllCartHandler(req.user, { page, limit });
    res.status(200).json(
      successResponse({
        data: cartsResponse.items,
        meta: paginateObject({
          page,
          limit,
          itemCount: cartsResponse.itemCount,
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
    const cartResponse = await readCartHandler(id);
    if (!cartResponse) {
      next(notFound("Cart item not found"));
    }
    return res.status(200).json(successResponse({ data: cartResponse }));
  } catch (err) {
    next(err);
  }
};

controller.update = async (req, res, next) => {
  try {
    const { price, quantity } = req.body;
    const cartResponse = await updateCartHandler(req.params.id, {
      price,
      quantity,
    });
    if (cartResponse) {
      return res.status(200).json(
        successResponse({
          message: "Successfully updated",
          data: cartResponse,
        }),
      );
    } else {
      next(
        notFound({
          message: "Cart not found",
        }),
      );
    }
  } catch (err) {
    next(err);
  }
};

controller.delete = async (req, res, next) => {
  try {
    const cartResponse = await deleteCartHandler(req.params.id);
    if (!cartResponse) {
      next(notFound("Cart item not found"));
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

controller.cancelCart = async (req, res, next) => {
  try {
    await cancelCartHandler(req.params.id);
    res.status(200).json(
      successResponse({
        status: "Success",
        data: [],
      }),
    );
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
