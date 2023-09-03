var typeorm = require("typeorm")
// const User = require("../model/user")

exports.AppdataSource = new typeorm.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "street-pizza",
    synchronize: true,
    entities: [require("../model/user")],
})

// module.exports = {AppdataSource};