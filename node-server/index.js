var mongoose = require("mongoose");
var config = require("config");
var debug = require("debug");
var debuglog = debug("Index:*");
var app = require("express")();

var indexRouter = require("./router/index");

mongoose.Promise = global.Promise;
mongoose
  .connect(
    config.get("dbConfig.mongoDb.host"),
    config.get("dbConfig.mongoDb.options")
  )
  .then(
    function (res) {
      debuglog("Connect mongoDB Succsess");
    },
    function (error) {
      debuglog("Failed", error);
    }
  );

app.set("./", indexRouter);
