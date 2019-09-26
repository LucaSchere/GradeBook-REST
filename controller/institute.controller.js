/** initialize express router **/
const app = require('express').Router();

/** initialize institute-repository **/
const instituteRepo = require('../repository/institute.repository');

const semesterRepo = require('../repository/semester.repository');

const subjectRepo = require('../repository/subject.repository');

const gradeRepo = require('../repository/grade.repository');


/** initialize middleware module verifyToken **/
const verifyToken = require('../middleware/verifyToken');

app.get('/all', verifyToken, (req, res) => {

    instituteRepo.all(req.user.id, function (institutes) {
        for(let i = 0; i < institutes.length; i++){
            if(institutes === false) err(res);
            semesterRepo.all(institutes[i].id, function (semesters) {
                if(semesters === false) err(res);

                for(let k = 0; k < semesters.length; k++){
                    subjectRepo.all(semesters[k].id, function (subjects) {
                        if(subjects === false) err(res);

                        for(let j = 0; j < subjects.length; j++){
                            gradeRepo.all(subjects[j].id, function (grades) {
                                if(grades === false) err(res);
                                subjects[j]['grades'] = grades;
                                semesters[k]['subjects'] = subjects;
                                institutes[i]['semesters'] = semesters;
                                if( j === subjects.length-1 &&
                                    k === semesters.length-1 &&
                                    i === institutes.length-1){
                                    res.status(200).json({
                                        success: true,
                                        institutes: institutes
                                    });
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



/** export module institute controller **/
module.exports = app;