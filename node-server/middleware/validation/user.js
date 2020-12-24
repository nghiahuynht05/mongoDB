
var Joi = require('joi');

module.exports = {
    '/api/user/add': Joi.object().keys({
        userName: Joi.string().required(),
        email: Joi.string().required()
    }),
    '/api/user/login': Joi.object().keys({
        userName: Joi.string().required(),
        password: Joi.string().required()
    })
}