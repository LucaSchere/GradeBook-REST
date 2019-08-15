/** initialize express router **/
const api_controller = require('express').Router();

/** initialize auth routes **/
const authRoutes = require('./authentication.controller');

/** /api **/
api_controller.get('/', (req, res) => {
    res.status(200).json({
        message: 'Connected!'
    });
});

/** use auth routes /auth **/
api_controller.use('/auth', authRoutes);

/** export module api controller **/
module.exports = api_controller;