/** initialize connection **/
const con = require('../database/connection');

/** initialize crypto object **/
const crypto = require('crypto');

const authRepo = {

    /** register function to create new database entry
     *  new user **/
    register: function (user, callback) {

        const sql = "INSERT INTO users(username, email, firstname, lastname, birthday, password, salt) VALUES ?";

        const salt = crypto.randomBytes(32).toString('hex');

        let hashedPassword = crypto.createHash('sha256').update(user.password);
        hashedPassword.update(salt);
        hashedPassword = hashedPassword.digest('hex');

        const values = [
            [user.username, user.email, user.firstname, user.lastname, user.birthday, hashedPassword, salt]
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
        const selectStatement = "SELECT * from users where username = ?";
        con.query(selectStatement, user.username, function (err, result) {
            if (!err && result[0] !== undefined) {
                let hashedPassword = crypto.createHash('sha256').update(user.password);
                hashedPassword.update(result[0].salt);
                hashedPassword = hashedPassword.digest('hex');
                if (hashedPassword === result[0].password) {
                    user.id = result[0].id;
                    callback(true);
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