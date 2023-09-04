var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
            length: 30
        },
        phone: {
            type: "varchar",
        },
        email: {
            type: "varchar",
        },
        password: {
            type: "varchar",
        },
        role:{
            type: "enum",
            enum: ['customer', 'chef', 'delivary_boy', 'app_admin'],
            default: 'customer'
        },
        status:{
            type: "enum",
            enum: ['pending', 'approved', 'block', 'reject'],
            default: 'pending'
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
})