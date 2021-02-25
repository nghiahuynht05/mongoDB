// Include Sequelize module 
const Sequelize = require('sequelize');
var config = require('config');

// Creating new Object of Sequelize 
const sequelize = new Sequelize(
    config.get('dbConfig.mysql.database'),
    config.get('dbConfig.mysql.user'),
    config.get('dbConfig.mysql.password'), {

    // Explicitly specifying  
    // mysql database 
    dialect: 'mysql',

    // By default host is 'localhost'            
    host: config.get('dbConfig.mysql.host')
}
);

// Exporting the sequelize object.  
// We can use it in another file 
// for creating models 
module.exports = sequelize 