const { setSeederFactory } = require("typeorm-extension");
const Menu = require("../../model/menu");
const { MENU_PUBLISH, MENU_VARIANTS } = require("../../utils/constants");

exports.MenuFactory = setSeederFactory(Menu, async (faker) => {
  const menu = {};
  menu.name = faker.lorem.word();
  menu.description = faker.lorem.paragraph();
  menu.cover = faker.image.urlLoremFlickr({ category: "food" });
  menu.price = faker.number.float({ min: 50, max: 200, precision: 0.2 });
  menu.status = faker.helpers.enumValue(MENU_PUBLISH);
  menu.variant = faker.helpers.enumValue(MENU_VARIANTS);
  return menu;
});
