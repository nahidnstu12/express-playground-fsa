const Joi = require("joi");
const orderSchemas = {
  orderUPDATE: Joi.object().keys({
    order_date: Joi.date().optional(),
    price: Joi.number().optional(),
    quantity: Joi.number().optional(),
    menuId: Joi.number().optional(),
    userId: Joi.number().optional(),
    order_type: Joi.string().optional(),
    order_status: Joi.string().optional(),
    payment_status: Joi.string().optional(),
  }),
  orderPOST: Joi.object().keys({
    order_date: Joi.date().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    menuId: Joi.number().required(),
    userId: Joi.number().required(),
    order_type: Joi.string().optional(),
    order_status: Joi.string().optional(),
    payment_status: Joi.string().optional(),
  }),

  orderLIST: {
    page: Joi.number().required(),
    limit: Joi.number().required(),
  },
  orderDETAIL: {
    id: Joi.number().min(1).required(),
  },
};
module.exports = orderSchemas;
