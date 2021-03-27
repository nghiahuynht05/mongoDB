var user = require('../user');
var ErrorCode = require('../../config/errorCode');

module.exports = function (app) {
    var api = {
        "add": "/api/user/add",
        "login": "/api/user/login",
        "logout": "/api/user/logout",
        "update": "/api/user/update"
    }
    app.post(api.add, function (req, res) {
        req.body = req.body || {};
        var User = new user();
        User.create(req.body).then(function (info) {
            res.send({ response: info, returnCode: ErrorCode.SUCCESS });
        }).catch(function (error) {
            res.send({ response: error, returnCode: ErrorCode.ERROR })
        });
    });

    app.post(api.login, function (req, res, next) {
        req.body = req.body || {};
        var User = new user()
        User.login(req.body).then(function (info) {
            res.send({ response: info, returnCode: ErrorCode.SUCCESS, error: {} });
            // req.session.user = info;
            // req.session.create(function (error, token) {
            //     res.send({ response: token, user: info, returnCode: ErrorCode.SUCCESS, error: {} });
            // })
            next();
        }).catch(function (error) {
            res.send({ response: {}, returnCode: ErrorCode.ERROR, error })
        });
    });

    app.post(api.logout, function (req, res) {
        if (req.session) {
            req.session.destroy(function () {
                res.send({ res: {} });
            })
        } else {
            res.send({ res: {} });
        }
    });

    app.post(api.update, function (req, res) {
        var User = new user();
        User.update(req.body).then(function (info) {
            res.send({ response: info, returnCode: ErrorCode.SUCCESS, error: {} });
        }).catch(function (error) {
            res.send({ response: {}, returnCode: ErrorCode.ERROR, error })
        })
    })
}