require('dotenv').config();
var config = require("config");
const app = require('express')();
const express = require('express');
var http = require("http").Server(app);
var io = require("socket.io")(http);
var mysql = require('mysql');
const async = require('async');
var bodyParser = require('body-parser');
var joi = require('./middleware/validation/joi');
const cors = require('cors');

// database
const mongoose = require('mongoose');

/**
 * Connecting database
 *
 */
require('./config/mongo').configMongoDb(mongoose, config);

require('./config/mysql').configMySQL(config)

/**
 * 
 * Connecting api
 */
app.use(express.static(__dirname + '/router'));

/**
 * 
 * Config parser params request
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(joi)

/**
 * 
 * Config CORS
 */
const corsOptions = {
    origins: ['*'],
    allowHeaders: ['Authorization', 'Content-Type', 'x-request-id'],
    methods: "GET,POST,PUT",
    preflightContinue: false
};

app.use(cors(corsOptions));

const router = require('./router');
async.parallel([function (callback) {
    mongoose.connection.on('connected', function () {
        callback()
    })
}], function () {
    router.initServer(io, http, app, config)
})