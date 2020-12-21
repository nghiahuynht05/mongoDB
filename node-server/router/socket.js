var app = require("express")();
var http = require("http");
// var io = require("socket.io")(http);
var port = process.env.PORT || 3000;
var server = http.createServer(function (req, res) {
    res.end('test');
});
module.exports = function (io) {
    server.on("connection", function (socket) {
        socket.on("chat message", function (msg) {
            server.emit("chat message", msg);
        });
    });

    server.listen(80, function () {
        console.log("listening on *:" + port);
    });

}