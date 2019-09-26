const con = require('../database/connection');

const semesterRepo = {

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

module.exports = semesterRepo;