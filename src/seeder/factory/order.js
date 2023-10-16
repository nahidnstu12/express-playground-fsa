const { setSeederFactory } = require("typeorm-extension");
const Order = require("../../model/order");
const {
  ORDER_TYPE,
  ORDER_STATUS,
  ORDER_PAYMENT_STATUS,
} = require("../../utils/constants");

exports.OrderFactory = setSeederFactory(Order, async (faker) => {
  const order = {};
  order.order_date = faker.date.between({
    from: "2020-01-01T00:00:00.000Z",
    to: "2030-01-01T00:00:00.000Z",
  });
  order.quantity = faker.number.int({ min: 1, max: 5 });
  order.price = faker.number.float({ min: 50, max: 200, precision: 0.2 });
  order.order_type = faker.helpers.enumValue(ORDER_TYPE);
  order.order_status = faker.helpers.enumValue(ORDER_STATUS);
  order.payment_status = faker.helpers.enumValue(ORDER_PAYMENT_STATUS);
  return order;
});
