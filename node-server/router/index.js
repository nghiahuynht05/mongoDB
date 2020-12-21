var blog = require('./blog')
var socket = require('./socket');

module.exports = function (app, io) {
  blog(app);
  socket(io)
}