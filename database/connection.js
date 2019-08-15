/** initialize mysql object **/
const mysql = require('mysql');

/** initialize config **/
const config = require('../config/config.json');

/** read dbConfig **/
const dbConfig = config.development.database;

/** define connection-data **/
const con = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
});

/** establishing a connection **/
con.connect(function(err) {
    if (err) throw err;
    console.log('----------------------------');
    console.log('Database connection SUCCESS');
    console.log('Connected on ' + dbConfig.host);
    console.log('----------------------------');
});

/** export module connection **/
module.exports = con;