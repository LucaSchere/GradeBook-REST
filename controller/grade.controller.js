/** initialize express router **/
const app = require('express').Router();

/** initialize grade-repository **/
const gradeRepo = require('../repository/grade.repository');

const verifyToken = require('../middleware/verifyToken');

const isAuthorized = require('../middleware/isAuthorized');

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

app.get('/all', [verifyToken, isAuthorized], (req, res) => {
    gradeRepo.all(req.query.subject_id, function (grades) {
        if (grades !== false) {
            res.status(201).json({
                success: true,
                grades: grades,
            });
        } else {
            res.status(400).json({
                success: false
            });
        }
    });
});

/** export module grade controller **/
module.exports = app;