const Joi = require('joi');

const eventBodySchema = Joi.object({
    instituteId: Joi.string().min(1),
    instituteName: Joi.string().min(1),
    sheetId: Joi.string().min(1),
    token: Joi.string().min(1)
});

module.exports = eventBodySchema;