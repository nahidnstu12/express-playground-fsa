var typeorm = require("typeorm")

var AppdataSource = new typeorm.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "street-pizza",
    synchronize: true,
    entities: [],
})

module.exports = {AppdataSource};