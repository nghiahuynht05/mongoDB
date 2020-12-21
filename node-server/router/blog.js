var blog = require('../model/blogModel')

var api = {
    add: '/api/blog/add'
}

module.exports = function (app) {
    app.post(api.add, function (req, res) {

    });
    app.all('/', function (req, res) {
        console.log("Aaaaaaaaaaaaa");
        res.sendFile(__dirname + "/index.html");
    });
}