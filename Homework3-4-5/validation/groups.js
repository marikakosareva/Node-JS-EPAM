const Joi = require('@hapi/joi');
const createError = require('http-errors');

const permissions = ["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"];

const schemaToCreate = Joi.object({
    id: Joi.string()
        .required(),

    name: Joi.string()
        .alphanum()
        .required(),
//добавить словарь, какие стринги можно emun +
    permissions: Joi.array().items(Joi.string().valid(...permissions)),
});

const schemaToUpdate = Joi.object({
    name: Joi.string()
        .alphanum(),
    permissions: Joi.array().items(Joi.string().valid(...permissions)),
});

function validateGroup(group, mode) {
    let validationResult = null;
    if (mode === "create") validationResult = schemaToCreate.validate(group);
    else validationResult = schemaToUpdate.validate(group);
    if (validationResult.error) {
        throw createError(400, 'Validation Error!');
    }
}

module.exports = {
    validateGroup
}