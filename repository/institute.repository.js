/** initialize connection **/
const con = require('../database/connection');

const instituteRepo = {

    /** returns all institutes by user **/
    all: function (user_id, callback) {
        const selectStatement = "SELECT * from institute where user_id = ?";
        con.query(selectStatement, user_id, function (err, result) {
            if (!err && result !== undefined) {
                callback(result);
            } else {
                callback(false);
            }
        })
    },

};

/** export module institute repository **/
module.exports = instituteRepo;