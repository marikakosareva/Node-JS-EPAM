const Joi = require('@hapi/joi');
const createError = require('http-errors');

const schemaToCreate = Joi.object({
    id: Joi.string()
        .required(),

    login: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    age: Joi.number()
        .integer()
        .min(4)
        .max(130)
        .required(),

    isDeleted: Joi.boolean()
        .required(),
});

const schemaToUpdate = Joi.object({
    id: Joi.string(),

    login: Joi.string()
        .alphanum()
        .min(3)
        .max(30),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    age: Joi.number()
        .integer()
        .min(4)
        .max(130),

    isDeleted: Joi.boolean(),
});

function validateUser(user, mode) {
    let validationResult = null;
    if (mode === "create") validationResult = schemaToCreate.validate(user);
    else validationResult = schemaToUpdate.validate(user);
    if (validationResult.error) {
        throw createError(400, 'Validation Error!');
    }
}

module.exports = {
    validateUser
}