const EventEmitter = require('events').EventEmitter;
const util = require('util');
const async = require('async');

var blog = require('../controller/api/blog')
var socket = require('../controller/socket/socket');
var user = require('../controller/api/user')

function Router(io, config) {
  this.io = io;
  this.config = config;
}
util.inherits(Router, EventEmitter);

exports.initServer = function (io, https, app, config) {
  blog(app);
  socket(io, https);
  user(app);
  
  async.parallel([], function () {
    io.router = new Router(io, config);
    var port = process.env.PORT
    function startServer() {
      https.listen(port, function () {
        setInterval(function () {
        }, 6700);
      });
    }
    startServer()
  })
}