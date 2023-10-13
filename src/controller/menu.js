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

const controller = {};

controller.create = async (req, res, next) => {
  try {
    const menu = await createMenuHandler({
      body: req.body,
      user: { userId: req.user.id },
    });
    if (!menu) {
      next(badRequest("Menu already exists"));
    }
    return res.status(201).json(
      successResponse({
        status: "Success",
        data: menu,
      }),
    );
  } catch (err) {
    next(err);
  }
};

controller.testing = async (req, res, next) => {
  try {
    const menu = await createTestingMenuHandler({
      body: req.body,
    });
    if (!menu) {
      next(badRequest("Menu already exists"));
    }
    return res.status(201).json(
      successResponse({
        status: "Success",
        data: menu,
      }),
    );
  } catch (err) {
    next(err);
  }
};

controller.readAll = async (req, res, next) => {
  try {
    const user = req.user;
    const menus = await readAllMenuHandler(user);
    res.status(200).json(
      successResponse({
        data: menus,
      }),
    );
  } catch (err) {
    next(err);
  }
};

controller.read = async (req, res, next) => {
  try {
    const id = req.params.id;
    const menu = await readMenuHandler(id);
    res.status(200).json(
      successResponse({
        data: menu,
      }),
    );
  } catch (err) {
    next(err);
  }
};

controller.update = async (req, res, next) => {
  try {
    const menu = await updateMenuHandler(req.params.id, req.body);

    if (menu) {
      return res.status(200).json(
        successResponse({
          message: "Successfully updated",
          data: menu,
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
    const publishableStatus = req.query.status;
    if (!publishableStatus) {
      next(badRequest("Provide publishable status"));
    }
    const menu = await publishMenuHandler(req.params.id, publishableStatus);

    const status = menu?.status === 400 ? 400 : 200;
    return res.status(status).json(
      successResponse({
        message:
          menu.message ||
          `Menu ${
            publishableStatus === "1" ? "Published" : "Unpublished"
          } Successfully`,
      }),
    );
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
