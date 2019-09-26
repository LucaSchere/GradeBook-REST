const app = require('express').Router();

const semesterRepo = require('../repository/semester.repository');

const subjectRepo = require('../repository/subject.repository');

const gradeRepo = require('../repository/grade.repository');

const verifyToken = require('../middleware/verifyToken');

const isAuthorized = require('../middleware/isAuthorized');

app.get('/all', [verifyToken, isAuthorized], (req, res) => {
    semesterRepo.all(req.query.institute_id, function (semesters) {
        for (let k = 0; k < semesters.length; k++) {
            subjectRepo.all(semesters[k].id, function (subjects) {
                if (subjects === false) err(res);

                for (let j = 0; j < subjects.length; j++) {
                    gradeRepo.all(subjects[j].id, function (grades) {
                        if (grades === false) err(res);
                        subjects[j]['grades'] = grades;
                        semesters[k]['subjects'] = subjects;
                        if (j === subjects.length - 1 &&
                            k === semesters.length - 1) {
                            res.status(200).json({
                                success: true,
                                semesters: semesters
                            });
                        }
                    });
                }

            })
        }

    });
});

function err(res) {
    res.status(400).json({
        success: false
    });
}


module.exports = app;