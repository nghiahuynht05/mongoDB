var Promise = require('bluebird');
var _ = require('lodash');
var generator = require('generate-password');
var crypto = require('crypto');

const UserModel = require('../model/userModel');
var ERROR_CODE = require('../config/errorCode')
function UserCtrl() { }

UserCtrl.prototype.create = function (parameter) {
    parameter = parameter || {};
    var userModel = new UserModel();
    var user = _.pick(parameter, ["userName", "firstName", "lastName", "email", "isActive"]);
    var password = generator.generate({
        length: 8,
        numbers: true,
        uppercase: true,
        strict: true
    });
    user.password = crypto.createHash('md5').update(password).digest('hex');
    console.log("Password ", password)
    var query = { userName: parameter.userName }
    return Promise.all([userModel.findOne(query)]).spread(function (foundUser) {
        if (foundUser) {
            return Promise.reject({ errorCode: ERROR_CODE.USER_EXISTED, message: "User existed." });
        }
        return userModel.createUser(user)
    });
};

UserCtrl.prototype.login = function (parameter) {
    parameter = parameter || {};
    var userModel = new UserModel();
    var pw = crypto.createHash('md5').update(parameter.password).digest('hex');;
    var query = {
        userName: parameter.userName
    }
    return Promise.all([userModel.findOne(query)]).spread(function (foundUser) {
        if (!foundUser) {
            return Promise.reject({ errorCode: ERROR_CODE.USER_NOTFOUND, message: "User not found." });
        }
        query = {
            userName: parameter.userName, password: pw
        }
        return userModel.login(query);
    })
}

module.exports = UserCtrl