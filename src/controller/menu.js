const {
  createMenuHandler,
  readMenuHandler,
  deleteMenuHandler,
  publishMenuHandler,
  readAllMenuHandler,
  updateMenuHandler,
  createTestingMenuHandler,
} = require("../service/menu");
const { successResponse } = require("../utils/success");
const { badRequest, notFound } = require("../utils/error");
const { paginateObject, getKeyByValue } = require("../utils/helpers");
const { MENU_PUBLISH } = require("../utils/constants");

const controller = {};

controller.create = async (req, res, next) => {
  try {
    const { id, name, description, price, status, variant, cover, userId } =
      req.body;
    const menuResponse = await createMenuHandler({
      body: { id, name, description, price, status, variant, cover, userId },
      user: { userId: req.user.id },
    });
    if (!menuResponse) {
      return next(badRequest("Menu already exists"));
    }
    return res.status(201).json(
      successResponse({
        code: 201,
        message: "Menu created successfully",
        data: menuResponse,
      }),
    );
  } catch (err) {
    next(err);
  }
};

controller.testing = async (req, res, next) => {
  try {
    const menuResponse = await createTestingMenuHandler({
      body: req.body,
    });
    if (!menuResponse) {
      return next(badRequest("Menu already exists"));
    }
    return res.status(201).json(
      successResponse({
        code: 201,
        message: "Menu created successfully",
        data: menuResponse,
      }),
    );
  } catch (err) {
    next(err);
  }
};

controller.readAll = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const user = req.user;
    const menusResponse = await readAllMenuHandler(user, { page, limit });
    console.log({ menusResponse, user });
    res.status(200).json(
      successResponse({
        data: menusResponse.items,
        meta: paginateObject({
          page,
          limit,
          itemCount: menusResponse.itemCount,
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
    const menuResponse = await readMenuHandler(id);
    if (!menuResponse) {
      next(notFound("Menu not found"));
    }
    return res.status(200).json(
      successResponse({
        data: menuResponse,
      }),
    );
  } catch (err) {
    next(err);
  }
};

controller.update = async (req, res, next) => {
  try {
    const { description, price, status, variant, cover, userId } = req.body;
    const menuResponse = await updateMenuHandler(req.params.id, {
      description,
      price,
      status,
      variant,
      cover,
      userId,
    });

    if (menuResponse) {
      return res.status(200).json(
        successResponse({
          message: "Successfully updated",
          data: menuResponse,
        }),
      );
    } else {
      next(notFound("Menu not found"));
    }
  } catch (err) {
    next(err);
  }
};

controller.delete = async (req, res, next) => {
  try {
    await deleteMenuHandler(req.params.id);
    res.status(200).json(
      successResponse({
        message: "Successfully deleted",
      }),
    );
  } catch (err) {
    next(err);
  }
};

controller.menuChangePublishStatus = async (req, res, next) => {
  try {
    const publishableStatus = +req.query.status;
    if (!publishableStatus) {
      next(badRequest("Provide publishable status"));
    }
    const menuResponse = await publishMenuHandler(
      req.params.id,
      publishableStatus,
    );
    if(!menuResponse){
      next(notFound("Menu not found"))
    }

    const status = menuResponse?.code === 400 ? 400 : 200;
    return res.status(status).json(
      successResponse({
        code: menuResponse.code,
        message:
          menuResponse.message ||
          `Menu ${getKeyByValue(MENU_PUBLISH, publishableStatus)} Successfully`,
      }),
    );
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
