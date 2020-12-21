const f = require('util').format;

const connectionString = f(`mongodb://qupreport:qupreport@${process.env.BDD_MONGO_HOST}/${process.env.BDD_MONGO_DB}?replicaSet=mongodb-rs&authSource=admin&connectTimeoutMS=30000&socketTimeouMS=30000`);

module.exports = {
    "dbConfig": {
        "adapter": "mongodb",
        "mongoDb": {
            "host": connectionString,
            "options": {
                "useNewUrlParser": true,
                "useUnifiedTopology": true,
                "useFindAndModify": false
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