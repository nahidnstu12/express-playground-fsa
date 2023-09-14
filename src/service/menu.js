const { AppdataSource } = require("../database/config");
const Menu = require("../model/menu");

const menuRepository = AppdataSource.getRepository(Menu);
const service = {};

service.createMenuHandler = async (input) => {
  const { name } = input;
  const isMenuExist = await menuRepository.findOneBy({
    name,
  });

  if (isMenuExist) {
    return false;
  }
  return await menuRepository.save(menuRepository.create({ ...input }));
};
//deprecated
service.readAllMenuHandler2 = async () => {
  return await menuRepository.find({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      status: true,
      variant: true,
      cover: true,
      userId: true,
    },
    // not working
    relations: { user: { select: ["id", "name", "email", "role", "status"] } },
  });
};

service.readAllMenuHandler = async () => {
  return await menuRepository
    .createQueryBuilder("menu")
    .select([
      "menu.id",
      "menu.name",
      "menu.description",
      "menu.price",
      "menu.status",
      "menu.variant",
      "menu.cover",
      "user.id",
      "user.name",
      "user.phone",
      "user.email",
      "user.role",
      "user.status",
    ])
    .leftJoin("menu.user", "user")
    .getMany();
};

service.readMenuHandler = async (id) => {
  return await menuRepository
    .createQueryBuilder("menu")
    .select([
      "menu.id",
      "menu.name",
      "menu.description",
      "menu.price",
      "menu.status",
      "menu.variant",
      "menu.cover",
      "user.id",
      "user.name",
      "user.phone",
      "user.email",
      "user.role",
      "user.status",
    ])
    .leftJoin("menu.user", "user")
    .where("menu.id = :id", { id })
    .getOne();
};
service.updateMenuHandler = async (id, data) => {
  const menu = await service.readMenuHandler(id);

  if (!menu) {
    return false;
  }

  Object.assign(menu, data);
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
service.unpublishMenuHandler = async (id) => {
  const menu = await service.readMenuHandler(id);

  if (!menu) {
    return false;
  }
  Object.assign(menu, { status: "unpublish" });

  return await menuRepository.save(menu);
};

module.exports = service;
