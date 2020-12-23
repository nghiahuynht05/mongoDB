var blogModel = require('../model/blogModel')

var api = {
    "add": "/api/blog/add"
}

module.exports = function (app) {
    app.post(api.add, function (req, res, next) {
        req.body = req.body || {};
        console.log(req.body)
        console.log(req.body)
        var blog = new blogModel();
        blog.save(req.body).then(function (info) {
            res.send({ response: info, returnCode: 200 })
        }).catch(function (error) {
            res.send({ response: error, returnCode: 304 })
        })
    });
    app.all('/', function (req, res) {
        res.sendFile(__dirname + "/index.html");
    });
}