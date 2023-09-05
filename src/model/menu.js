const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Menu",
    tableName: "menus",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
            length: 30,
        },
        description: {
            type: "varchar",
            length: 255,
        },
        cover: {
            type: "varchar",
        },
        price: {
            type: "double",
        },
        variant: {
            type: "enum",
            enum: [
                "pizza",
                "Smoky BBQ Delight",
                "Pepperoni Supreme",
                "Veggie Feast",
                "Mushroom Elegance",
            ],
            default: "pizza",
        },
        user_id: {
            type: "int",
        },
        created_at: {
            type: "datetime",
            createDate: true,
        },
        updated_at: {
            type: "datetime",
            updateDate: true,
        },
    },
    relations: {
        user: {
            type: "many-to-one",
            target: "User",
            joinTable: true,
            cascade: true,
            onDelete: "CASCADE", // You can specify the desired behavior on delete
        },
    },
});
