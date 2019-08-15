/** initialize express router **/
const app = require('express').Router();

/** initialize auth-repository **/
const authRepo = require('../repository/auth.repository');

/** initialize jwt object**/
const jwt = require('jsonwebtoken');

/** initialize config **/
const config = require('../config/config');

/** initialize middleware module verifyToken **/
const verifyToken = require('./verifyToken');

/** logon post request /api/auth/
 *  checks for valid token **/
app.post('/', verifyToken, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
        message: 'Valid token provided.'
    });
});

/** login post request /api/auth/login/
 *  checks for valid credentials
 *  returns jwt header **/
app.post('/login', (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
    };

    authRepo.login(user, (state) => {
        console.log(user);
        if (!state) {
            res.status(400).json({
                success: false
            });
        } else {
            const token = jwt.sign({id: user.id, username: user.username}, config.server_secret, {});
            res.header('jwt', token).status(200).json({
                success: true
            });
        }
    });

});

/** register post request /api/auth/register/
 *  checks for valid credentials **/
app.post('/register', (req, res) => {
    const user = {
        username: req.body.username,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthday: req.body.birthday,
        password: req.body.password,

    };
    authRepo.register(user, (state) => {
        console.log(state);
        if (state === true) {
            res.status(201).json({
                message: 'Account created',
                success: true
            });
        } else {
            res.status(400).json({
                message: 'Account couldnt be created',
                success: false
            });
        }
    });
});

/** export module auth controller **/
module.exports = app;