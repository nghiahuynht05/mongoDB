var debug = require('debug');
var debuglog = debug('UserModel:*');
var Promise = require('bluebird');
const jwt = require('jsonwebtoken');

const UserSchema = require('./schema/userSchema');
var ERROR_CODE = require('../config/errorCode');
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
        if (infoUser.password !== parameters.password) {
            return Promise.reject({ errorCode: ERROR_CODE.WORNG_PASSWORD, message: "Password incorrect." })
        }
        var token = generateAuthToken(infoUser._id);
        try {
            return Promise.all([UserSchema.findOneAndUpdate({ _id: infoUser._id }, { $set: { token: token } })]).spread(function (res) {
                debuglog("DEBUG", "UserSchema.findOnAndUpdate", "respone", JSON.stringify(res));
                return UserSchema.findOne({ userName: parameters.userName });
            });
        } catch (error) {
            debuglog("ERROR", "UserSchema.findOne", "error", error);
            throw error;
        }
    }).catch(function (error) {
        debuglog("ERROR", "UserSchema.findOne", "error", error);
        throw error;
    })
}

UserModel.prototype.update = function (conditions, update) {
    var updateInfo = { $set: update }
    return UserSchema.findOneAndUpdate(conditions, updateInfo).then(function (userInfo) {
        return UserSchema.findOne(conditions);
    }).catch(function (error) {
        debuglog("ERROR", "UserSchema.findOneAndUpdate", "error", error);
        throw error;
    })
}

function generateAuthToken(params) {
    return jwt.sign({ _id: params }, process.env.JWT_KEY, { expiresIn: "60000ms" });
}
module.exports = UserModel