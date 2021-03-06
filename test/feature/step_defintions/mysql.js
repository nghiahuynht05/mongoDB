var { Given } = require('cucumber');
const sequelize = require('../../../config/sequelize');
var Users = require('./input/table/User');

Given('MySQL is connected', function (callback) {
    var self = this;
    self.mySQL.connect(function (err) {
        if (err) {
            callback(err);
        }
        callback();
    });
});

Given(/^Create all the table defined using$/, async function () {
    await sequelize.sync()
        .then(() => { return })
        .catch((err) => { callback(JSON.stringify(err.errors)) });
});

Given(/^Insert a record to table Users with data$/, function (record, callback) {
    var info = record.hashes();

    info.forEach(async function (data) {
        await Users.create(JSON.parse(data.record))
            .then(() => { return })
            .catch((err) => { callback(JSON.stringify(err.errors)) });
    });
    callback()
});
