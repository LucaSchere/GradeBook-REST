/** initialize express router **/
const app = require('express').Router();

/** initialize grade-repository **/
const gradeRepo = require('../repository/grade.repository');

/** initialize middleware module verifyToken **/
const verifyToken = require('./verifyToken');

app.post('/create', verifyToken, (req, res) => {
    const grade = {
        value: req.body.value,
        evaluation: req.body.evaluation,
        subject: req.body.subject,
        comment: req.body.comment,

    };
    gradeRepo.create(grade, (state) => {
        if (state === true) {
            res.status(201).json({
                message: 'Grade created',
                success: true
            });
        } else {
            res.status(400).json({
                message: 'Grade  couldnt be created',
                success: false
            });
        }
    });
});

app.post('/all', verifyToken, (req, res) => {

    gradeRepo.all(req.user, (result) => {
        if (result !== false) {
            res.status(201).json({
                message: 'returned grades',
                success: true
            });
        } else {
            res.status(400).json({
                message: 'Couldnt read Grades',
                success: false
            });
        }
    });
});

/** export module grade controller **/
module.exports = app;