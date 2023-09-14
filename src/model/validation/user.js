const Joi = require("joi");
const userSchemas = {
  userPOST: Joi.object().keys({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(5).required(),
    role: Joi.string().optional(),
    status: Joi.string().optional(),
  }),
  userLIST: {
    page: Joi.number().required(),
    limit: Joi.number().required(),
  },
  userDETAIL: {
    id: Joi.number().min(1).required(),
  },
};
module.exports = userSchemas;
