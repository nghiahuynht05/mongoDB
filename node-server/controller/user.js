var Promise = require('bluebird');
var _ = require('lodash');
var generator = require('generate-password');
var crypto = require('crypto');

const UserModel = require('../model/userModel');
var ERROR_CODE = require('../config/errorCode')
class UserCtrl {
    constructor() { }
    create(parameter) {
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
        console.log("Password ", password);
        var query = { userName: parameter.userName };
        return Promise.all([userModel.findOne(query)]).spread(function (foundUser) {
            if (foundUser) {
                return Promise.reject({ errorCode: ERROR_CODE.USER_EXISTED, message: "User existed." });
            }
            return userModel.createUser(user);
        });
    }
    login(parameter) {
        parameter = parameter || {};
        var userModel = new UserModel();
        var pw = crypto.createHash('md5').update(parameter.password).digest('hex');
        var query = {
            userName: parameter.userName
        };
        return Promise.all([userModel.findOne(query)]).spread(function (foundUser) {
            if (!foundUser) {
                return Promise.reject({ errorCode: ERROR_CODE.USER_NOTFOUND, message: "User not found." });
            }
            query = {
                userName: parameter.userName, password: pw
            };
            return userModel.login(query);
        });
    }
    update(parameter) {
        parameter = parameter || {};
        var userModel = new UserModel();
        var query = { userName: parameter.userName };
        return Promise.all([userModel.findOne(query)]).spread(function (foundUser) {
            if (!foundUser) {
                return Promise.reject({ errorCode: ERROR_CODE.USER_NOTFOUND, message: "User not found." });
            }
            var conditions = _.pick(parameter, ['userName']);
            var update = _.pick(parameter, ['firstName', 'lastName', 'email']);
            return userModel.update(conditions, update);
        });
    }

    async forgot(parameter) {
        parameter = parameter || {};
        var userModel = new UserModel();
        return await Promise.all([userModel.findOne(_.pick(parameter, ['userName']))]).spread(function (foundUser) {
            if (!foundUser) {
                return Promise.reject({ errorCode: ERROR_CODE.USER_NOTFOUND, message: "User not found." });
            }
            var password = generator.generate({
                length: 8,
                numbers: true,
                uppercase: true,
                strict: true
            });
            console.log("Password ", password);
            var token = userModel.generateAuthToken(foundUser._id);
            foundUser.set("password", crypto.createHash('md5').update(password).digest('hex'));
            foundUser.set("token", token);
            return foundUser.save();
        }).then(function (saveUser) {
            console.log(saveUser);
        }).catch(function (error) {
            console.log(error);
        });
    }
}
module.exports = UserCtrl