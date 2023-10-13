const Joi = require("joi");
const {USER_STATUS, USER_ROLES} = require("../../utils/constants");


const userSchemas = {
  userPOST: Joi.object().keys({
    id: Joi.number().optional(),
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(5).required(),
    role: Joi.number()
        .valid(...Object.values(USER_ROLES))
        .optional(),
    status: Joi.number()
        .valid(...Object.values(USER_STATUS))
        .optional(),
  }),
  userUpdate: Joi.object().keys({
    name: Joi.string().optional(),
    phone: Joi.string().optional(),
    email: Joi.string().email().lowercase().optional(),
    password: Joi.string().min(5).optional(),
    role: Joi.number()
        .valid(...Object.values(USER_ROLES))
        .optional(),
    status: Joi.number()
        .valid(...Object.values(USER_STATUS))
        .optional(),
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
