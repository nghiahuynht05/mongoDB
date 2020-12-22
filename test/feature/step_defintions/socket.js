
var socket = require('socket.io-client')("http://localhost:3000", { 'force new connection': true, reconnect: true });

socket.on('connect', function (info) {
    console.log("connect");
    socket.emit('chat message', "hello");
    socket.on('chat message', function (data) {
        console.log('data: ', JSON.stringify(data))
    })
});