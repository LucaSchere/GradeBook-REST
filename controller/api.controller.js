/** initialize express router **/
const api_controller = require('express').Router();

/** initialize auth routes **/
const authRoutes = require('./authentication.controller');

/** initialize grade routes **/
const gradeRoutes = require('./grade.controller');

/** initialize institute routes **/
const instituteRoutes = require('./institute.controller');

/** initialize semester routes **/
const semesterRoutes = require('./semester.controller');

/** initialize subject routes **/
const subjectRoutes = require('./subject.controller');

/** /api **/
api_controller.get('/', (req, res) => {
    res.status(200).json({
        message: 'Connected!'
    });
});

/** use auth routes /auth **/
api_controller.use('/auth', authRoutes);

/** use grade routes /auth **/
api_controller.use('/grade', gradeRoutes);

/** use institute routes /auth **/
api_controller.use('/institute', instituteRoutes);

/** use semester routes /auth **/
api_controller.use('/semester', semesterRoutes);

/** use subject routes /auth **/
api_controller.use('/subject', subjectRoutes);

/** export module api controller **/
module.exports = api_controller;