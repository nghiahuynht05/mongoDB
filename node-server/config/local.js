module.exports = {
  dbConfig: {
    adapter: "mongodb",
    mongoDb: {
      host: `mongodb://localhost:27017/admin?replicaSet=mongodb-rs&authSource=admin&connectTimeoutMS=30000&socketTimeouMS=30000`,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    },
    redis: {
      server: "localhost",
      port: 6379,
      username: "admin",
      password: "qgs@123",
    },
    mysql: {
      host: "localhost",
      database: "qupworldLab",
      user: "root",
      password: "root",
    },
    redisMapProvider: {
      server: "localhost",
      port: 6379,
      index: 0,
      username: "admin",
      password: "qgs@123",
    },
  },
};
