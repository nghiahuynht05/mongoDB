var debug = require('debug');
var debuglog = debug('UserModel:*');
var Promise = require('bluebird');
const jwt = require('jsonwebtoken');

const UserSchema = require('./schema/userSchema');
var ERROR_CODE = require('../config/errorCode');
class UserModel {
    constructor() { }
    createUser(parameters) {
        var select = {
            userName: 1,
            firstName: 1,
        };
        return new Promise(function (resolve, reject) {
            UserSchema.insertMany(parameters, function (error, res) {
                if (!error) {
                    resolve({ userName: res[0].userName, firstName: res[0].firstName, lastName: res[0].lastName });
                } else {
                    debuglog("ERROR", "UserSchema.insertMany", "error", "import Error: " + error.code);
                    reject(error);
                }
            });
        });
    }
    async findOne(parameters) {
        try {
            const user = await UserSchema.findOne(parameters);
            debuglog("DEBUG", "UserSchema.findOne", "user details", JSON.stringify(user));
            return user;
        } catch (error) {
            debuglog("ERROR", "UserSchema.findOne", "error", error);
            throw error;
        }
    }
    async login(parameters) {
        try {
            const infoUser = await UserSchema.findOne({ userName: parameters.userName });
            debuglog("DEBUG", "UserSchema.findOne", "user details", JSON.stringify(infoUser));
            if (!infoUser.isActive) {
                return Promise.reject({ errorCode: ERROR_CODE.isACTIVE, message: "User is deactive." });
            }
            if (infoUser.password !== parameters.password) {
                return Promise.reject({ errorCode: ERROR_CODE.WORNG_PASSWORD, message: "Password incorrect." });
            }
            var token = this.generateAuthToken(infoUser._id);
            try {
                return Promise.all([UserSchema.findOneAndUpdate({ _id: infoUser._id }, { $set: { token: token } })]).spread(function (res) {
                    debuglog("DEBUG", "UserSchema.findOnAndUpdate", "respone", JSON.stringify(res));
                    return UserSchema.findOne({ userName: parameters.userName });
                });
            } catch (error) {
                debuglog("ERROR", "UserSchema.findOne", "error", error);
                throw error;
            }
        } catch (error_1) {
            debuglog("ERROR", "UserSchema.findOne", "error", error_1);
            throw error_1;
        }
    }
    async update(conditions, update) {
        var updateInfo = { $set: update };
        try {
            const userInfo = await UserSchema.findOneAndUpdate(conditions, updateInfo);
            return await UserSchema.findOne(conditions);
        } catch (error) {
            debuglog("ERROR", "UserSchema.findOneAndUpdate", "error", error);
            throw error;
        }
    }
    generateAuthToken(params) {
        return jwt.sign({ _id: params }, process.env.JWT_KEY, { expiresIn: "60000ms" });
    }
}

module.exports = UserModel