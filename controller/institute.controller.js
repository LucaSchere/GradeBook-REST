/** initialize express router **/
const app = require('express').Router();

/** initialize institute-repository **/
const instituteRepo = require('../repository/institute.repository');

const semesterRepo = require('../repository/semester.repository');

const subjectRepo = require('../repository/subject.repository');

const gradeRepo = require('../repository/grade.repository');


/** initialize middleware module verifyToken **/
const verifyToken = require('../middleware/verifyToken');

let emptySemesters= 0, emptySubjects = 0;
app.get('/all', verifyToken, (req, res) => {
    instituteRepo.all(req.user.id, function (institutes) {
        if(institutes === false) err(res);
        if(institutes.length === 0){
            success(res, institutes);
        }
        for(let i = 0; i < institutes.length; i++){
            semesterRepo.all(institutes[i].id, function (semesters) {
                if(semesters === false) err(res);
                institutes[i]['semesters'] = semesters;
                if(semesters.length === 0){
                    emptySemesters++;
                    if(emptySemesters === institutes.length) success(res, institutes);
                }

                for(let k = 0; k < semesters.length; k++){
                    subjectRepo.all(semesters[k].id, function (subjects) {
                        if(subjects === false) err(res);
                        semesters[k]['subjects'] = subjects;
                        if(subjects.length === 0){
                            emptySubjects++;
                            if(emptySubjects === semesters.length) success(res, institutes);
                        }

                        for(let j = 0; j < subjects.length; j++){
                            gradeRepo.all(subjects[j].id, function (grades) {
                                if(grades === false) err(res);
                                subjects[j]['grades'] = grades;

                                if( j === subjects.length-1 &&
                                    k === semesters.length-1 &&
                                    i === institutes.length-1){
                                    success(res, institutes);
                                }
                            });
                        }

                    })
                }

            });
        }
    });
});

function err(res){
    res.status(400).json({
        success: false
    });
}

function success(res, institutes){
    res.status(200).json({
        success: true,
        institutes: institutes
    });
}



/** export module institute controller **/
module.exports = app;