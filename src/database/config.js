const typeorm = require("typeorm");
const User = require("../model/user");
const Menu = require("../model/menu");
const Cart = require("../model/cart");
const Order = require("../model/order");
const { UsersFactory } = require("../seeder/factory/user");
const { MenuFactory } = require("../seeder/factory/menu");
const { CartFactory } = require("../seeder/factory/cart");
const { OrderFactory } = require("../seeder/factory/order");
const MainSeeder = require("../seeder");
// console.log("testing=>", process.env.database);

exports.AppdataSource = new typeorm.DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || "3306",
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "street-pizza",
  synchronize: true,
  logging: process.env.NODE_ENV === "development",
  entities: [User, Menu, Cart, Order],
  factories: [UsersFactory, MenuFactory, CartFactory, OrderFactory],
  seeds: [MainSeeder],
});

// module.exports = {AppdataSource};
