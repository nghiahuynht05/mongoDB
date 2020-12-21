const { fromCallback, resolve } = require("bluebird");
var mongoose = require("mongoose");
var debug = require('debug');
var debuglog = debug('BlogModel:*');
var Promise = require('bluebird');

var Blog = require("../model/schema/blogSchema");

function BlogModel() { }

BlogModel.prototype.save = function () {
  return new Promise(function (resolve, reject) {
    Blog.insertMany({
      title: "A",
      author: "Nghia",
      body: "Hello",
      hidden: true,
    }, function (error, res) {
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
