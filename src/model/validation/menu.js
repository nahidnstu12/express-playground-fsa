const Joi = require("joi");
const {MENU_PUBLISH, MENU_VARIANTS} = require("../../utils/constants");
const menuSchemas = {
  menuPOST: Joi.object().keys({
    id: Joi.number().optional(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    cover: Joi.string().optional(),
    price: Joi.number().required(),
    status: Joi.number()
        .valid(...Object.values(MENU_PUBLISH))
        .optional(),
    variant: Joi.number()
        .valid(...Object.values(MENU_VARIANTS))
        .optional(),
    userId: Joi.number().optional(),
  }),
  menuUpdate: Joi.object().keys({
    // name: Joi.string().optional(),
    description: Joi.string().optional(),
    cover: Joi.string().optional(),
    price: Joi.number().optional(),
    status: Joi.number()
        .valid(...Object.values(MENU_PUBLISH))
        .optional(),
    variant: Joi.number()
        .valid(...Object.values(MENU_VARIANTS))
        .optional(),
    userId: Joi.number().optional(),
  }),
  menuLIST: {
    page: Joi.number().required(),
    limit: Joi.number().required(),
  },
  menuDETAIL: {
    id: Joi.number().min(1).required(),
  },
  menuBulkUpload: {
    filename: Joi.string().required()
  },
};
module.exports = menuSchemas;
