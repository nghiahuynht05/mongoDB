const EventEmitter = require('events').EventEmitter;
const util = require('util');
const async = require('async');
var _ = require('lodash');
var debug = require('debug')
var debuglog = debug('INDEX:*');

var blog = require('../controller/api/blog')
var sockets = require('../controller/socket/socket');
var user = require('../controller/api/user')
var port = process.env.PORT

function Router(io, config) {
  this.io = io;
  this.config = config;
}
util.inherits(Router, EventEmitter);

exports.initServer = function (io, https, app, config) {
  blog(app);
  io.on('connect', function (socket) {
    const ua = socket.handshake.headers['user-agent']; // user-agent header from an HTTP request
    let agent = {};
    try {
      agent = parser.setUA(ua).getResult();
    } catch (ex) { }
    const ip = socket.handshake.headers['x-real-ip'];
    debuglog('INFO', 'Router', 'NEW CONNECTION', { port: port, ip: ip, agent: agent });
    _.set(socket, 'handshake.query.connectedTime', new Date().getTime());

    sockets(io, socket);
  })
  user(app);

  async.parallel([], function () {
    io.router = new Router(io, config);
    function startServer() {
      https.listen(port, function () {
        setInterval(function () {
        }, 6700);
      });
    }
    startServer()
  })
}