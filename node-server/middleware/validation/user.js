const Joi = require('joi');

module.exports = {
    '/api/user/add': Joi.object({
        userName: Joi.string().required(),
        email: Joi.string().required()
    }),
    '/api/user/login': Joi.object({
        userName: Joi.string().required(),
        password: Joi.string().required()
    })
}