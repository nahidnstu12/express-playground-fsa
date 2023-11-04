const Joi = require("joi");
const {
  USER_ROLES,
  USER_STATUS,
  USER_ROLES_WITHOUT_APP_ADMIN,
} = require("../../utils/constants");

const authSchemas = {
  register: Joi.object().keys({
    id: Joi.number().optional(),
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(5).required(),
    role: Joi.number()
      .valid(...Object.values(USER_ROLES_WITHOUT_APP_ADMIN))
      .optional(),
    status: Joi.number()
      .valid(...Object.values(USER_STATUS))
      .optional(),
  }),
  registerAppAdmin: Joi.object().keys({
    id: Joi.number().optional(),
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(5).required(),
  }),
  login: Joi.object().keys({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(5).optional(),
  }),
};
module.exports = authSchemas;
