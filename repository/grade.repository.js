/** initialize connection **/
const con = require('../database/connection');

const gradeRepo = {

    /** create function to create new database entry
     *  new grade **/
    create: function (grade, callback) {

        const sql = "INSERT INTO grade(value, evaluation, subject, comment) VALUES ?";

        const values = [
            [grade.value, grade.evaluation, grade.subject, grade.comment]
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

    /** returns all grades by user **/
    all: function (subject_id, callback) {
        const selectStatement = "SELECT * from grade where subject_id = ?";
        con.query(selectStatement, subject_id, function (err, result) {
            if (!err && result !== undefined) {
                callback(result);
            } else {
                callback(false);
            }
        })
    },

};

/** export module grade repository **/
module.exports = gradeRepo;