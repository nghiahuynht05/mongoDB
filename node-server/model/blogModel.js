const { fromCallback } = require("bluebird");
var mongoose = require("mongoose");

var Blog = require("../model/schema/blogSchema");

function BlogModel() {}

BlogModel.prototype.save = function (callback) {
  Blog.insertMany({
    title: "A",
    author: "Nghia",
    body: "Hello",
    hidden: true,
  })
    .then(function (res) {
      debuglog("Inserted", res.length, res.length < 2 ? "blog" : "blogs");
      callback();
    })
    .catch(function (error) {
      callback(error);
    });
};

module.exports = BlogModel;
