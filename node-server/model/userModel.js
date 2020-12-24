var debug = require('debug');
var debuglog = debug('BlogModel:*');
var Promise = require('bluebird');

const User = require('./schema/userSchema');

function UserModel() { }

UserModel.prototype.create = function (parameters) {
    return new Promise(function (resolve, reject) {
      parameters = parameters || {};
      User.insertMany(parameters, function (error, res) {
        if (!error) {
          resolve(res)
        } else {
          debuglog("ERROR", "UserModel.insertMany", "error", null, "import Error: " + error.code);
          reject(error)
        }
      });
    });
  };
  

module.exports = UserModel