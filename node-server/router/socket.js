var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

module.exports = function (io, https) {
    io.on('connection', (socket) => {
        console.log('a user connected');
    });

    io.on('connection', function (socket) {
        socket.on('chat message', function (msg) {
            io.emit('chat message', msg);
        });
    });
}