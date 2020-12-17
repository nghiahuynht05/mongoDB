const { model } = require("mongoose");

module.exports = {
    "dbConfig": {
        "adapter": "mongodb",
        "mongoDb": {
            "host": `mongodb://qupreport:qupreport@192.168.2.82,192.168.2.84,192.168.2.86/auto-dispatching-bdd-nghia?replicaSet=mongodb-rs&authSource=admin&connectTimeoutMS=30000&socketTimeouMS=30000`,
            "options": {
                "useNewUrlParser": true,
                "useUnifiedTopology": true
            }
        },
        "redis": {
            "server": "localhost",
            "port": 6379,
            "username": "admin",
            "password": "qgs@123"
        },
        "mysql": {
            "host": "localhost",
            "database": "qupworldLab",
            "user": "root",
            "password": "root"
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