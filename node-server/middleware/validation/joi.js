const Joi = require('joi');
const schemas = require('./index');

var ERROR_CODE = require('../../config/errorCode');

module.exports = function (req, res, callback) {
    var data = Object.assign({}, req.body);
    if (schemas[req.path]) {
        var info = schemas[req.path].validate(data, { stripUnknown: true });
        if (!info.error) {
            callback();
        }
        else {
            res.status(400).send(info.error);
        }
    } else {
        var error = {
            status: 400,
            errorCode: ERROR_CODE.VALIDATION_ERROR,
            message: "Validation error."
        }
        res.status(400).send(error);
    }
}