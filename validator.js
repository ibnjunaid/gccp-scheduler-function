const Joi = require('joi');

const eventBodySchema = Joi.object({
    instituteId: Joi.string().min(1).required(),
    instituteName: Joi.string().min(1).required(),
    sheetId: Joi.string().min(1).required(),
    token: Joi.string().min(1).required()
});

module.exports = eventBodySchema;