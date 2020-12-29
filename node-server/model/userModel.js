var debug = require('debug');
var debuglog = debug('UserModel:*');
var Promise = require('bluebird');

const UserSchema = require('./schema/userSchema');
var ERROR_CODE = require('../config/errorCode');
const userSchema = require('./schema/userSchema');
function UserModel() { }

UserModel.prototype.createUser = function (parameters) {
    var select = {
        userName: 1,
        firstName: 1,
    }
    return new Promise(function (resolve, reject) {
        UserSchema.insertMany(parameters, function (error, res) {
            if (!error) {
                resolve({ userName: res[0].userName, firstName: res[0].firstName, lastName: res[0].lastName })
            } else {
                debuglog("ERROR", "UserSchema.insertMany", "error", "import Error: " + error.code);
                reject(error)
            }
        });
    });
};

UserModel.prototype.findOne = function (parameters) {
    return UserSchema.findOne(parameters).then(function (user) {
        debuglog("DEBUG", "UserSchema.findOne", "user details", JSON.stringify(user));
        return user;
    }).catch(function (error) {
        debuglog("ERROR", "UserSchema.findOne", "error", error);
        throw error;
    })
}

UserModel.prototype.login = function (parameters) {
    return UserSchema.findOne({ userName: parameters.userName }).then(function (infoUser) {
        debuglog("DEBUG", "UserSchema.findOne", "user details", JSON.stringify(infoUser));
        if (!infoUser.isActive) {
            return Promise.reject({ errorCode: ERROR_CODE.isACTIVE, message: "User is deactive." })
        }
        if (infoUser.password != parameters.password) {
            return Promise.reject({ errorCode: ERROR_CODE.WORNG_PASSWORD, message: "Password incorrect." })
        }
        return infoUser;
    }).catch(function (error) {
        debuglog("ERROR", "UserSchema.findOne", "error", error);
        throw error;
    })
}

UserModel.prototype.update = function (conditions, update) {
    var updateInfo = { $set: update }
    return UserSchema.findOneAndUpdate(conditions, updateInfo).then(function (userInfo) {
        return userSchema.findOne(conditions);
    }).catch(function (error) {
        debuglog("ERROR", "UserSchema.findOneAndUpdate", "error", error);
        throw error;
    })
}
module.exports = UserModel