var debug = require('debug');
var debuglog = debug('BlogModel:*');
var Promise = require('bluebird');

var Blog = require("../model/schema/blogSchema");

function BlogModel() { }

BlogModel.prototype.save = function (parameters) {
  return new Promise(function (resolve, reject) {
    parameters = parameters || {};
    Blog.insertMany(parameters, function (error, res) {
      if (!error) {
        resolve(res)
      } else {
        debuglog("ERROR", "BlogModel.insertMany", "error", null, "import Error: " + error.code);
        reject(error)
      }
    });
  });
};

module.exports = BlogModel;
