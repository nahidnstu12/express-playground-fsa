const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Order",
  tableName: "orders",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    order_date: {
      type: "datetime",
      createDate: true,
    },
    quantity: {
      type: "int",
    },
    price: {
      type: "double",
    },
    userId: {
      type: "int",
    },
    menuId: {
      type: "int",
    },
    order_type: {
      type: "enum",
      enum: ["instant_order", "home_delivary"],
      default: "instant_order",
    },
    order_status: {
      type: "enum",
      enum: [
        "pending",
        "order_taken",
        "order_processing",
        "order_shipped",
        "order_delivered",
        "order_rejected",
      ],
      default: "pending",
    },
    payment_status: {
      type: "enum",
      enum: ["pending", "paid", "reject"],
      default: "pending",
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
      target: "User",
      type: "many-to-one",
      joinTable: true,
      cascade: true,
    },
    menu: {
      target: "Menu",
      type: "many-to-one",
      joinTable: true,
      cascade: true,
    },
  },
});
