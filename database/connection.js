var mysql = require('mysql');
var config = require('../config/config.json');
var dbConfig = config.development.database;
var con = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
});

con.connect(function(err) {
    if (err) throw err;
    console.log('----------------------------');
    console.log('Database connection SUCCESS');
    console.log('Connected on ' + dbConfig.host);
    console.log('----------------------------');
});

module.exports = con;