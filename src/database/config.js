const typeorm = require("typeorm");
const User = require("../model/user");
const Menu = require("../model/menu");
const Cart = require("../model/cart");
const Order = require("../model/order");
// console.log("testing=>", process.env.database);
exports.AppdataSource = new typeorm.DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: process.env.database,
  synchronize: true,
  logging: process.env.NODE_ENV === "development",
  entities: [User, Menu, Cart, Order],
});

// module.exports = {AppdataSource};
