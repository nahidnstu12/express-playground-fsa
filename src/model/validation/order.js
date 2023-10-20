const Joi = require("joi");
const {
  ORDER_TYPE,
  ORDER_STATUS,
  ORDER_PAYMENT_STATUS,
} = require("../../utils/constants");
const orderSchemas = {
  orderUPDATE: Joi.object().keys({
    order_date: Joi.date().optional(),
    price: Joi.number().optional(),
    quantity: Joi.number().optional(),
    menuId: Joi.number().optional(),
    userId: Joi.number().optional(),
    order_type: Joi.number()
      .valid(...Object.values(ORDER_TYPE))
      .optional(),
    order_status: Joi.number()
      .valid(...Object.values(ORDER_STATUS))
      .optional(),
    payment_status: Joi.number()
      .valid(...Object.values(ORDER_PAYMENT_STATUS))
      .optional(),
  }),
  orderPOST: Joi.object().keys({
    id: Joi.number().optional(),
    order_date: Joi.date().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    menuId: Joi.number().required(),
    userId: Joi.number().required(),
    order_type: Joi.number()
      .valid(...Object.values(ORDER_TYPE))
      .optional(),
    order_status: Joi.number()
      .valid(...Object.values(ORDER_STATUS))
      .optional(),
    payment_status: Joi.number()
      .valid(...Object.values(ORDER_PAYMENT_STATUS))
      .optional(),
  }),

  orderLIST: {
    page: Joi.number().required(),
    limit: Joi.number().required(),
  },
  orderDETAIL: {
    id: Joi.number().min(1).required(),
  },
  orderStatus: {
    order_status: Joi.number().min(1).max(6).required(),
  },
};
module.exports = orderSchemas;
