/** initialize connection **/
const con = require('../database/connection');

const semesterRepo = {

    /** returns all semesters by user **/
    all: function (institute_id, callback) {

        const selectStatement = 'SELECT * from semester where institute_id = ?';
        con.query(selectStatement, institute_id, function (err, result) {

            if (!err && result !== undefined) {
                callback(result);
            } else {
                callback(false);
            }
        })
    },

};

/** export module semester repository **/
module.exports = semesterRepo;