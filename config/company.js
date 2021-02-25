const { model } = require("mongoose");

module.exports = {
    "dbConfig": {
        "adapter": "mongodb",
        "mongoDb": {
            "host": `mongodb://qupreport:qupreport@${process.env.BDD_MONGO_HOST}/${process.env.BDD_MONGO_DB}?replicaSet=mongodb-rs&authSource=admin&connectTimeoutMS=30000&socketTimeouMS=30000`,
            "options": {
                "useNewUrlParser": true,
                "useUnifiedTopology": true,
                'useFindAndModify': false
            }
        },
        "redis": {
            "server": "localhost",
            "port": 6379,
            "username": "admin",
            "password": "qgs@123"
        },
        "mysql": {
            "host": process.env.BDD_MYSQL_HOST,
            "user": process.env.BDD_MYSQL_USER,
            "password": process.env.BDD_MYSQL_PASSWORD,
            "database": process.env.BDD_MYSQL_DATABASE
        },
        "redisMapProvider": {
            "server": "localhost",
            "port": 6379,
            "index": 0,
            "username": "admin",
            "password": "qgs@123"
        }
    }
}