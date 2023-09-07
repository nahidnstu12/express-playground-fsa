const { AppdataSource } = require("../database/config");
const Menu = require("../model/menu");

const menuRepository = AppdataSource.getRepository(Menu);
const service = {};

service.createMenuHandler = async (input) => {
  return await menuRepository.save(menuRepository.create({ ...input }));
};
service.readAllMenuHandler = async () => {
  return await menuRepository.find({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      status: true,
      variant: true,
      cover: true,
      user_id: true,
    },
  });
};
service.readMenuHandler = async (id) => {
  return await menuRepository.find({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      status: true,
      variant: true,
      cover: true,
      user_id: true,
    },
    where: { id },
  });
};
service.updateMenuHandler = async (id, data) => {
  const menu = await service.readMenuHandler(id);

  if (!menu) {
    return false;
  }

  Object.assign(menu, data);
  console.log("updateMenuHandler", menu);
  return await menuRepository.save(menu);
};
service.deleteMenuHandler = async (id) => {
  const menu = await service.readMenuHandler(id);

  if (!menu) {
    return false;
  }
  return await menuRepository.delete({ id });
};
service.publishMenuHandler = async (id) => {
  const menu = await service.readMenuHandler(id);

  if (!menu) {
    return false;
  }
  Object.assign(menu, { status: "publish" });

  return await menuRepository.save(menu);
};
service.unpublishMenuHandler = async (input) => {
  const menu = await service.readMenuHandler(id);

  if (!menu) {
    return false;
  }
  Object.assign(menu, { status: "unpublish" });

  return await menuRepository.save(menu);
};

module.exports = service;
