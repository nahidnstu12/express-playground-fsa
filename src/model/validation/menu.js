const Joi = require("joi");
const menuSchemas = {
  menuPOST: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    cover: Joi.string().optional(),
    price: Joi.number().required(),
    status: Joi.string().optional(),
    variant: Joi.string().optional(),
    userId: Joi.number().required(),
  }),
  menuLIST: {
    page: Joi.number().required(),
    limit: Joi.number().required(),
  },
  menuDETAIL: {
    id: Joi.number().min(1).required(),
  },
};
module.exports = menuSchemas;
