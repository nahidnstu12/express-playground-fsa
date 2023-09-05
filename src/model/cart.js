var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Cart",
    tableName: "carts",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        quantity: {
            type: "int",
        },
        price: {
            type: "double",
        },



        created_at: {
            type: "datetime",
            createDate: true
        },
        updated_at: {
            type: "datetime",
            updateDate: true
        }
    },
    relations: {
        user_id: {
            target: "User",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
        },
        menu_id: {
            target: "Menu",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
        },
    },
})