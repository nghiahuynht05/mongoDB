var user = require('../user');
var ErrorCode = require('../../config/errorCode');

module.exports = function (app) {
    var api = {
        "add": "/api/user/add",
        "login": "/api/user/login"
    }
    app.post(api.add, function (req, res) {
        req.body = req.body || {};
        var User = new user()
        User.create(req.body).then(function (info) {
            res.send({ response: info, returnCode: ErrorCode.SUCCESS });
        }).catch(function (error) {
            res.send({ response: error, returnCode: ErrorCode.ERROR })
        });
    });

    app.post(api.login, function (req, res) {
        req.body = req.body || {};
        var User = new user()
        User.login(req.body).then(function (info) {
            res.send({ response: info, returnCode: ErrorCode.SUCCESS });
        }).catch(function (error) {
            res.send({ response: error, returnCode: ErrorCode.ERROR })
        });
    })
}