require('dotenv').config();
var config = require("config");
const app = require('express')();
const express = require('express');
var http = require("http").Server(app);
var io = require("socket.io")(http);
const async = require('async');

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

const router = require('./router');
async.parallel([function (callback) {
    mongoose.connection.on('connected', function () {
        callback()
    })
}], function () {
    router.initServer(io, http, app, config)
})