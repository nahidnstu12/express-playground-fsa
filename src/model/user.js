const { USER_STATUS, USER_ROLES } = require("../utils/constants");
const EntitySchema = require("typeorm").EntitySchema;

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
      length: 30,
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
    role: {
      type: "enum",
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.CUSTOMER,
    },

    status: {
      type: "enum",
      enum: Object.values(USER_STATUS),
      default: USER_STATUS.PENDING,
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
});
