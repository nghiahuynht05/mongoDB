var config = require('config');
var mysql = require('mysql');
var mongoose = require('mongoose');
var socket = require('socket.io-client');
var request = require('supertest');

var connection_string = config.get('dbConfig.mongoDb.host');
var connection_options = config.get('dbConfig.mongoDb.options');
var connection_options_mysql = config.get('dbConfig.mysql');
var socket_options = {
    'force new connection': true,
    reconnect: true
}
mongoose.set('debug', process.env.BDD_MONGO_DEBUG === "yes");

var { setWorldConstructor, setDefaultTimeout } = require('cucumber');
setDefaultTimeout(10000)

var World = function World() {
    this.storage = {}
    this.connection_string = connection_string;
    this.connection_options = connection_options;
    this.urlClient = request(process.env.BDD_HOST);
    this.wsClient = socket(process.env.BDD_HOST, socket_options);
    this.mySQL = mysql.createConnection(connection_options_mysql);

    this.matchData = function (data, expect) {
        var self = this;
        if (_.isArray(expect) && _.isArray(data)) {
            return expect.every(function (item) {
                return data.some(function (datum) {
                    return self.matchData(datum, item);
                })
            })
        } else {
            return _.isMatchWith(data, expect, matchFn);
        }
    }

    this.matchDataWithTheSameOrder = function (data, expect) {
        var self = this;
        if (_.isArray(expect) && _.isArray(data)) {
            return expect.every(function (item, index) {
                return self.matchDataWithTheSameOrder(data[index], item);
            })
        } else {
            return _.isMatchWith(data, expect, matchWithOrderFn);
        }
    }

    function matchWithOrderFn(obj, src) {
        if (!_.isObject(obj)) {
            return obj === src;
        }
        if (_.isArray(src) && _.isArray(obj)) {
            return src.every(function (item, index) {
                return matchWithOrderFn(obj[index], item);
            })
        } else {
            if (_.matches(src)(obj)) return true;
            return Object.keys(src).every(function (key) {
                return matchWithOrderFn(obj[key], src[key]);
            })
        }

        return false;
    }

    function matchFn(obj, src) {
        if (!_.isObject(obj)) {
            return obj === src
        }
        if (_.isArray(src) && _.isArray(obj)) {
            return src.every(function (item) {
                return obj.some(function (datum) {
                    return matchFn(datum, item);
                })
            })
        } else {
            if (_.matches(src)(obj)) return true;
            return Object.keys(src).every(function (key) {
                return matchFn(obj[key], src[key]);
            })
        }
        return false;
    }
}

setWorldConstructor(World)
