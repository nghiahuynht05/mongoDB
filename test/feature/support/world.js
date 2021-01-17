var config = require('config');

var connection_string = config.get('dbConfig.mongoDb.host')
var connection_options = config.get('dbConfig.mongoDb.options')
var mongoose = require('mongoose')

mongoose.set('debug', process.env.BDD_MONGO_DEBUG === "yes")

var { setWorldConstructor, setDefaultTimeout } = require('cucumber');
setDefaultTimeout(10000)

var World = function World(){
    this.connection_string = connection_string;
    this.connection_options = connection_options;
    this.urlClient = process.env.LOCAL_BDD_HOST;
}

setWorldConstructor(World)
