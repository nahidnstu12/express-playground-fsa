const Joi = require("joi");
const menuSchemas = {
  menuPOST: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    cover: Joi.string().optional(),
    price: Joi.number().required(),
    status: Joi.string().optional(),
    variant: Joi.string().optional(),
    userId: Joi.number().optional(),
  }),
  menuUpdate: Joi.object().keys({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    cover: Joi.string().optional(),
    price: Joi.number().optional(),
    status: Joi.string().optional(),
    variant: Joi.string().optional(),
    userId: Joi.number().optional(),
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
