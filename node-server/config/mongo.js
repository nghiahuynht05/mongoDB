/**
 * Connecting MongoDB
 *
 */

const db = {};
let queryConn = null;

db.configMongoDb = function (mongoose, config) {
    mongoose.set('debug', process.env.DB_MODE === 'debug');
    const options = config.get("dbConfig.mongoDb.options");

    queryConn = mongoose.createConnection(config.get('dbConfig.mongoDb.host'), options);

    queryConn.on('error', function (err) {
        console.error('[queryConn] MongoDB Connection Error. Please make sure MongoDB is running. -> ' + err);
    });

    queryConn.on('connected', function () {
        console.info('[queryConn] MongoDB Connected');
    });

    // Reconnect when closed
    queryConn.on('disconnected', function () {
        console.log('[queryConn] disconnected mongodb');
    });

    const connect = function () {
        const options = config.get('dbConfig.mongoDb.options');
        mongoose.connect(config.get('dbConfig.mongoDb.host'), options);
    };
    connect();

    // Error handler
    mongoose.connection.on('error', function (err) {
        console.error('MongoDB Connection Error. Please make sure MongoDB is running. -> ' + err);
        process.exit(1);
    });
    mongoose.connection.on('connected', function () {
        console.info('MongoDB Connected', config.get('dbConfig.mongoDb.host'));
    });

    // Reconnect when closed
    mongoose.connection.on('disconnected', function () {
        console.log('disconnected mongodb');
        process.exit(1);
    });
};

Object.defineProperties(db, {
    queryConn: {
        get: function () {
            if (queryConn === null) {
                throw new Error('[queryConn] run configMongoDb() before to initialize');
            }
            return queryConn;
        },
        set: function (val) { }
    }
});

module.exports = db