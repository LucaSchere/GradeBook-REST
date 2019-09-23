/** initialize express router **/
const app = require('express').Router();

/** initialize grade-repository **/
const instituteRepo = require('../repository/institute.repository');

/** initialize semester-repository **/
const semesterRepo = require('../repository/semester.repository');

/** initialize middleware module verifyToken **/
const verifyToken = require('./verifyToken');

app.post('/all', verifyToken, (req, res) => {

    instituteRepo.all(req.user.id, (institutes) => {
        if (institutes !== false) {
            for (let institute of institutes){
                semesterRepo.all(institute.id, (semesters) => {
                    if(semesters !== false){
                        console.log(semesters);
                        institute.semesters = semesters;
                    }
                });
            }
            res.status(201).json({
                success: true,
                institutes: institutes,
            });
        } else {
            res.status(400).json({
                success: false
            });
        }
    });
});



/** export module institute controller **/
module.exports = app;