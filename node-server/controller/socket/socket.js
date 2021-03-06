var debug = require('debug')
var debuglog = debug('SOCKET:*');

module.exports = function (io, socket) {
    socket.on('chat', function (params) {
        return void io.emit('chat', params);
    });
}