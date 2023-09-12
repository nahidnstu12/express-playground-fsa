const Joi = require("joi");
const cartSchemas = {
  cartPOST: Joi.object().keys({
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    menuId: Joi.number().required(),
    userId: Joi.number().required(),
  }),
  cartLIST: {
    page: Joi.number().required(),
    limit: Joi.number().required(),
  },
  cartDETAIL: {
    id: Joi.number().min(1).required(),
  },
};
module.exports = cartSchemas;
