const {
  createMenuHandler,
  readMenuHandler,
  deleteMenuHandler,
  publishMenuHandler,
  readAllMenuHandler,
  unpublishMenuHandler,
  updateMenuHandler,
} = require("../service/menu");

const controller = {};

controller.create = async (req, res, next) => {
  try {
    const menu = await createMenuHandler(req.body);
    if (!menu) {
      return res.status(400).json({
        message: "Menu already exists",
      });
    }
    return res.status(201).json({
      status: "Success",
      data: menu,
    });
  } catch (err) {
    next(err);
  }
};

controller.readAll = async (req, res, next) => {
  try {
    const menus = await readAllMenuHandler();
    res.status(200).json({
      message: "Success",
      data: menus,
      total: menus.length,
    });
  } catch (err) {
    next(err);
  }
};

controller.read = async (req, res, next) => {
  try {
    const id = req.params.id;
    const menu = await readMenuHandler(id);
    res.status(200).json({
      message: "Success",
      data: menu,
    });
  } catch (err) {
    next(err);
  }
};

controller.update = async (req, res, next) => {
  try {
    const menu = await updateMenuHandler(req.params.id, req.body);

    if (menu) {
      return res.status(200).json({
        message: "Successfully updated",
        data: menu,
      });
    } else {
      return res.status(404).json({
        status: "Menu not found",
      });
    }
  } catch (err) {
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
    next(err);
  }
};

module.exports = controller;
