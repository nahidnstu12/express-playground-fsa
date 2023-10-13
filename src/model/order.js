const {ORDER_TYPE, ORDER_STATUS, ORDER_PAYMENT_STATUS} = require("../utils/constants");
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
      enum: Object.values(ORDER_TYPE),
      default: ORDER_TYPE.INSTANT_ORDER,
    },
    order_status: {
      type: "enum",
      enum:  Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING,
    },
    payment_status: {
      type: "enum",
      enum:  Object.values(ORDER_PAYMENT_STATUS),
      default: ORDER_PAYMENT_STATUS.PENDING,
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
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    menu: {
      target: "Menu",
      type: "many-to-one",
      joinTable: true,
      cascade: true,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
});
