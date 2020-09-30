const Joi = require('@hapi/joi');

module.exports = Joi.object({
    id: Joi.string()
        .required(),

    name: Joi.string()
        .alphanum()
        .required(),

    permissions: Joi.array(),
});