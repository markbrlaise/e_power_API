const joi = require('joi');

function registerValidation(data) {
    const schema = joi.object({
        username: joi.string().min(3).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
        account_number: joi.string().regex(/^[0-9]{20}$/).required(),
        mobile_number: joi.string().regex(/^[0-9]{10}$/).required(),
    });
    return schema.validate(data);
}

function loginValidation(data) {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
    });
    return schema.validate(data);
}

module.exports = { registerValidation, loginValidation };
