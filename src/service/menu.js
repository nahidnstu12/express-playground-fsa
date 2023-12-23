const { AppdataSource } = require("../database/config");
const Menu = require("../model/menu");
const { USER_ROLES, MENU_PUBLISH } = require("../utils/constants");
const xlsx = require("xlsx");
const Joi = require("joi");
const menuSchemas = require("../model/validation/menu");

const menuRepository = AppdataSource.getRepository(Menu);
const service = {};

service.createMenuHandler = async (input) => {
  const { name } = input.body;
  const isAlreadyMenuExistInDB = await menuRepository.findOneBy({
    name,
  });

  if (isAlreadyMenuExistInDB) {
    return false;
  }

  return await menuRepository.save(
    menuRepository.create({ ...input.body, ...input.user }),
  );
};

service.createBulkMenuHandler = async (input) => {
  const workbook = xlsx.readFile(input.file.path);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

  const keys = data[0];

  const result = data
    .slice(1)
    .filter((item) => item.length > 0)
    .map((row) => {
      const obj = {};
      keys.forEach((key, index) => {
        obj[key] = row[index] || null;
      });
      return obj;
    });
  const extractMenuNames = result.map((item) => ({
    name: item.name,
  }));
  const isAlreadyMenuExistInDB = await menuRepository.findBy(extractMenuNames);

  if (isAlreadyMenuExistInDB?.length > 0) {
    return {
      code: 400,
      message: `${isAlreadyMenuExistInDB
        ?.map((item) => item.name)
        .join(", ")} menu already exists`,
    };
  }

  const schema = Joi.array().items(menuSchemas.menuPOST);

  const validationResult = schema
    .options({ abortEarly: false })
    .validate(result);

  if (validationResult.error) {
    const { details } = validationResult.error;
    const message = details.map((i) => i.message);
    return {
      code: 400,
      message: message,
    };
  }
  return await menuRepository.save(result);
};

service.createTestingMenuHandler = async (input) => {
  const { name } = input.body;
  const isAlreadyMenuExistInDB = await menuRepository.findOneBy({
    name,
  });

  if (isAlreadyMenuExistInDB) {
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
