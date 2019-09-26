/** initialize connection **/
const con = require('../database/connection');

/** initialize crypto object **/
const crypto = require('crypto');

const authRepo = {

    authorize: function (query, callback){

        con.query(query, function (err, result) {
            if (!err && result[0] !== undefined) {
                callback(result);
            } else {
                callback(false);
            }
        })
    },

    /** register function to create new database entry
     *  new user **/
    register: function (user, callback) {

        const sql = "INSERT INTO user(email, firstname, lastname, birthday, password, salt) VALUES ?";

        const salt = crypto.randomBytes(32).toString('hex');

        let hashedPassword = crypto.createHash('sha256').update(user.password);
        hashedPassword.update(salt);
        hashedPassword = hashedPassword.digest('hex');

        const values = [
            [user.email, user.firstname, user.lastname, user.birthday, hashedPassword, salt]
        ];
        con.query(sql, [values], function (err, result) {
            if (err === null || err === undefined) {
                callback(true);
            } else {
                console.log(err);
                callback(false);
            }
        });
    },
    /** login function to check validity of credentials
     *  login user **/
    login: function (user, callback) {
        const selectStatement = "SELECT * from user where email = ?";
        con.query(selectStatement, user.email, function (err, result) {
            if (!err && result[0] !== undefined) {
                let hashedPassword = crypto.createHash('sha256').update(user.password);
                hashedPassword.update(result[0].salt);
                hashedPassword = hashedPassword.digest('hex');
                if (hashedPassword === result[0].password) {
                    callback(result[0].id);
                } else {
                    callback(false);
                }
            } else {
                callback(false);
            }
        })
    },
};

/** export module auth repository **/
module.exports = authRepo;