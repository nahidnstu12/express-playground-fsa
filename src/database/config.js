var typeorm = require("typeorm")
const User = require("../model/user")
const Menu = require("../model/menu")
const Cart = require("../model/cart")
const Order = require("../model/order")

exports.AppdataSource = new typeorm.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "street-pizza",
    synchronize: true,
    entities: [User, Menu, Cart, Order],
})

// module.exports = {AppdataSource};