var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var debug = require('debug')
var debuglog = debug('SOCKET:*');

module.exports = function (io, https) {
    io.on('connection', (socket) => {
        debuglog("SUCCES", "SOCKET CONNECT", "error", null);
    });

    io.on('connection', function (socket) {
        socket.on('chat message', function (msg) {
            io.emit('chat message', msg);
        });
    });
}