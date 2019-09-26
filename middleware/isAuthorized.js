/** initialize auth-repository **/
const authRepo = require('../repository/auth.repository');

const types = [
    'institute',
    'semester',
    'subject',
    'grade'
];

function isAuthorized(req, res, next) {

    let dbQuery;

    try {
        const entityType = req.originalUrl.split('/')[2];
        const superType = types[types.indexOf(entityType) - 1];
        const param = superType + '_id';
        const entity = req.query[param];

        switch (entityType) {
            case types[1]:
                dbQuery = 'select user_id from institute where id = (select institute_id from semester where id = ' + entity + ');';
                break;
            case types[2]:
                dbQuery = 'select user_id from institute where id = (select institute_id from semester where id = (select semester_id from subject where id = ' + entity + '));';
                break;
            case types[3]:
                dbQuery = 'select user_id from institute where id = (select institute_id from semester where id = (select semester_id from subject where id = (select subject_id from grade where id = ' + entity + ')));';
                break;
        }

        authRepo.authorize(dbQuery, function (result) {
            if(result === false){
                return res.status(400).send({success: false, message: 'no ' + superType+ ' with ID: ' + entity});
            }
            if(result[0]['user_id'] !== req.user.id){
                return res.status(401).send({success: false, message: 'Unauthorized.'});
            }
            next();
        });

    } catch (e) {
        return res.status(400).send({success: false, message: 'Invalid path.'});

    }
}


module.exports = isAuthorized;