require('dotenv').config();
var config = require("config");
var app = require("express")();

var indexRouter = require("./router/index");

// database
const mongoose = require('mongoose');

/**
 * Connecting database
 *
 */
require('./config/mongo').configMongoDb(mongoose, config);

app.set("./", indexRouter);
