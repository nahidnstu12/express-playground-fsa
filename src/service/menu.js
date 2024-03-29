const { AppdataSource } = require("../database/config");
const Menu = require("../model/menu");
const { USER_ROLES, MENU_PUBLISH } = require("../utils/constants");

const menuRepository = AppdataSource.getRepository(Menu);
const service = {};

service.createMenuHandler = async (input) => {
  const { name } = input.body;
  const isMenuExist = await menuRepository.findOneBy({
    name,
  });

  if (isMenuExist) {
    return false;
  }

  return await menuRepository.save(
    menuRepository.create({ ...input.body, ...input.user }),
  );
};
service.createTestingMenuHandler = async (input) => {
  const { name } = input.body;
  const isMenuExist = await menuRepository.findOneBy({
    name,
  });

  if (isMenuExist) {
    return false;
  }

  return await menuRepository.save(menuRepository.create({ ...input.body }));
};
//deprecated
// service.readAllMenuHandler2 = async () => {
//   return await menuRepository.find({
//     select: {
//       id: true,
//       name: true,
//       description: true,
//       price: true,
//       status: true,
//       variant: true,
//       cover: true,
//       userId: true,
//     },
//     // not working
//     relations: { user: { select: ["id", "name", "email", "role", "status"] } },
//   });
// };

service.readAllMenuHandler = async (user, { page, limit }) => {
  const userRole = user?.role !== USER_ROLES.ADMIN;
  const menuQueryBuilder = await menuRepository.createQueryBuilder("menu");
  const itemCount = await menuQueryBuilder
    .where("menu.status != :status", { status: userRole ? "unpublish" : "" })
    .getCount();
  const items = await menuQueryBuilder
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
    ])
    .leftJoin("menu.user", "user")
    .where("menu.status != :status", { status: userRole ? "unpublish" : "" })
    .skip((page - 1) * limit)
    .take(limit)
    .getMany();

  return { itemCount, items };
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
service.publishMenuHandler = async (id, status) => {
  const menu = await service.readMenuHandler(id);

  if (!menu) {
    return false;
  }

  if (Object.values(MENU_PUBLISH).some((val) => val === status)) {
    Object.assign(menu, { status: status });
  } else {
    return {
      code: 400,
      message: "Invalid publishing status.",
    };
  }

  return await menuRepository.save(menu);
};

// service.unpublishMenuHandler = async (id) => {
//   const menu = await service.readMenuHandler(id);
//
//   if (!menu) {
//     return false;
//   }
//   Object.assign(menu, { status: "unpublish" });
//
//   return await menuRepository.save(menu);
// };

module.exports = service;
