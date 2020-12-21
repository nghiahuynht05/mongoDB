require('dotenv').config();
var config = require("config");
const app = require('express')();
const express = require('express');
var http = require("http").Server(app);
var io = require("socket.io")(http);

// database
const mongoose = require('mongoose');

/**
 * Connecting database
 *
 */
require('./config/mongo').configMongoDb(mongoose, config);

/**
 * 
 * Connecting api
 */
app.use(express.static(__dirname + '/router'));
app.listen(process.env.PORT);
require("./router")(app, io);

const async = require('async');
async.parallel([function (callback) {
    mongoose.connection.on('connected', function () {
        callback()
    })
}])