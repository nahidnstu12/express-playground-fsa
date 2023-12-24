const { EntitySchema } = require("typeorm");
const { MENU_VARIANTS, MENU_PUBLISH, RowStatus} = require("../utils/constants");

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
      nullable: true,
    },
    cover: {
      type: "varchar",
      nullable: true,
    },
    price: {
      type: "double",
    },
    stock:{
      type: "int",
      min: 0,
      default: 0
    },
    status: {
      type: "enum",
      enum: Object.values(MENU_PUBLISH),
      default: MENU_PUBLISH.PUBLISHED,
    },
    variant: {
      type: "enum",
      enum: Object.values(MENU_VARIANTS),
      default: MENU_VARIANTS.PIZZA,
    },
    userId: {
      type: "int",
    },
    row_status: {
      type: "enum",
      enum: Object.values(RowStatus),
      default: RowStatus.ACTIVE,
    },
    created_at: {
      type: "datetime",
      createDate: true,
    },
    updated_at: {
      type: "datetime",
      updateDate: true,
    },
    deleted_at: {
      type: "datetime",
      deleteDate: true,
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      // joinTable: { inverseJoinColumn: "userId" },
      cascade: true,
      onDelete: "CASCADE", // You can specify the desired behavior on delete
    },
  },
});
