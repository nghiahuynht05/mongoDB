const jwt = require('jsonwebtoken');
const User = require('../model/schema/userSchema');
const ErrorCode = require('../config/errorCode');
var debug = require('debug');
var debuglog = debug('Authoriztion:*');

var auth = async function (req, res, callback) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({ _id: data._id, 'token': token });
        if (!user) {
            throw new Error();
        }
        debuglog("DEBUG", "Authoriztion", "authoriztion detail", JSON.stringify(user));
        req.user = user;
        callback();
    } catch (error) {
        res.status(401).send({ response: {}, returnCode: ErrorCode.ERROR, error });
    };
}

module.exports = auth;