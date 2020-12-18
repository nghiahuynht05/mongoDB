var config = require("config");
var fs = require('fs');
const { MongoClient, Logger } = require("mongodb");
var _ = require('lodash');
var Promise = require('bluebird');
const mongoose = require('mongoose');
var debug = require('debug');
var debuglog = debug('MongoDB:*');

const Blog = require('../../../model/schema/Blog')
var Utils = require("../../../utils/Utils.js");

var { Given, When, Then } = require('cucumber');

Given(/^Mongodb is connected$/, function (callback) {
    if (!mongoose.connection.readyState) {
        mongoose.connect(this.connection_string, this.connection_options, function (error) {
            callback(error);
        });
    } else callback();
});

Given(/^All collections are empty$/, function (callback) {
    mongoose.connection.db.collections(function (error, models) {
        Promise.each(models, function (model) {
            if (model.collectionName.indexOf(".") > -1) {
                return;
            }
            return Promise.promisify(model.remove, {
                context: model
            })();
        }).then(lodash.ary(callback, 0))
            .catch(callback);
    })
});

Given(/^"([^"]*)" collections are empty$/, function (collection, callback) {
    mongoose.connection.db.collection(collection, function (error, models) {
        return Promise.promisify(models.deleteMany, {
            context: models
        })();
    });
    debuglog('Remove', collection, 'collection');
    callback()
});

Given(/^Find info in Blog collection with$/, function (table, callback) {
    var data = table.hashes()[0];
    Blog.find(data).then(function (data) {
        debuglog('Finded', JSON.stringify(data));
        callback()
    })
    callback()
});

Given(/^Create data Blog collection based on "([^"]*)"$/, function (tmpFile, table, callback) {
    var data = table.hashes();
    var blogTmp = JSON.parse(fs.readFileSync(__dirname + "/input/" + tmpFile));
    var blogList = [];
    var keys = Object.keys(data[0]); // return list key of Object. example: {a:"1",b:"2"} >> ["a", "b"]
    data.forEach(function (item) {
        var blog = new Blog(blogTmp);
        keys.forEach(function (key) {
            var value = Utils.validateData(item[key]);
            var subKeys = key.split(".");
            blog = Utils.setSubDocValue(blog, subKeys, value);
        })
        blogList.push(blog);
    });

    Blog.createAsync(blogList).then(function (result) {
        debuglog('Inserted', result.length, result.length < 2 ? "blog" : "blogs");
        callback()
    }).catch(function (error) {
        callback(error)
    })
});

Given(/^Update data Blog collection based on$/, function (table, callback) {
    var conditions = JSON.parse(table.hashes()[0].conditions);
    var update = JSON.parse(table.hashes()[0].dataUpdate);

    Blog.findOneAndUpdate(conditions, { $set: update }).then(function () {
        callback()
    }).catch(function (error) {
        callback(error)
    });
});

Given(/^Update data "([^"]*)" collection based on$/, function (collection, table, callback) {
    var conditions = JSON.parse(table.hashes()[0].conditions);
    var update = JSON.parse(table.hashes()[0].dataUpdate);

    mongoose.connection.db.collections(function (error, models) {
        Promise.each(models, function (model) {
            if (model.collectionName == collection) {
                findAndUpdate(model, conditions, update);
            }
        }).then(_.ary(callback, 0)).catch(callback)
    })
    function findAndUpdate(collection, conditions, update) {
        collection.findOneAndUpdate(conditions, { $set: update }).then(function () {
            callback()
        }).catch(function (error) {
            callback(error)
        });
    }
});
