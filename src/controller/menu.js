const {
  createMenuHandler,
  readMenuHandler,
  deleteMenuHandler,
  publishMenuHandler,
  readAllMenuHandler,
  updateMenuHandler,
} = require("../service/menu");

const controller = {};

controller.create = async (req, res, next) => {
  try {
    const menu = await createMenuHandler({
      body: req.body,
      user: { userId: req.user.id },
    });
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
    const user = req.user;
    console.log("header", user);
    const menus = await readAllMenuHandler(user);
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

controller.menuChangePublishStatus = async (req, res, next) => {
  try {
    const publishableStatus = req.query.status;
    if (!publishableStatus) {
      return res.status(400).json({
        message: "Provide publishable status",
      });
    }
    const menu = await publishMenuHandler(req.params.id, publishableStatus);
    return res.status(200).json({
      message:
        menu.message ||
        `Menu ${
          publishableStatus === "1" ? "Published" : "Unpublished"
        } Successfully`,
    });
  } catch (err) {
    next(err);
  }
};
// controller.menuUnpublish = async (req, res, next) => {
//   try {
//     await unpublishMenuHandler(req.params.id);
//     res.status(200).json({
//       message: "Successfully unpublished",
//     });
//   } catch (err) {
//     next(err);
//   }
// };

module.exports = controller;
