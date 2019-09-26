const app = require('express').Router();

const subjectRepo = require('../repository/subject.repository');

const gradeRepo = require('../repository/grade.repository');

const verifyToken = require('../middleware/verifyToken');

const isAuthorized = require('../middleware/isAuthorized');


app.get('/all', [verifyToken, isAuthorized], (req, res) => {
    subjectRepo.all(req.query.semester_id, function (subjects) {

        for (let j = 0; j < subjects.length; j++) {
            gradeRepo.all(subjects[j].id, function (grades) {
                if (grades === false) {
                    res.status(400).json({
                        success: false
                    });
                }
                subjects[j]['grades'] = grades;
                if (j === subjects.length - 1) {
                    res.status(200).json({
                        success: true,
                        subjects: subjects
                    });
                }
            });
        }

    });
});

module.exports = app;