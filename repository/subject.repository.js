const con = require('../database/connection');

const subjectRepo = {

    all: function (semester_id, callback) {

        const selectStatement = 'SELECT * from subject where semester_id = ?';
        con.query(selectStatement, semester_id, function (err, result) {
            if (!err && result !== undefined) {
                callback(result);
            } else {
                callback(false);
            }
        })
    },

};

module.exports = subjectRepo;