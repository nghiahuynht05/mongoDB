/**
 * Connecting MySQL
 *
 */
var mysql = require('mysql');

const db = {};

db.configMySQL = function (config) {
    var options = config.get('dbConfig.mysql')

    // Create connect server
    var con = mysql.createConnection(options);

    // Connect
    var connect = function () {
        con.connect(
            function (err) {
                if (err) {
                    console.error('Error connecting: ' + err.stack);
                    return;
                };
                console.log('Connected as id ' + con.threadId);
            }
        );
    };

    connect()
};

module.exports = db