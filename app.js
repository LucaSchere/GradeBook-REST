/** initialize express **/
const express = require('express');
const app = express();

/** initialize config **/
const config = require('./config/config.json');

/** initialize API routes **/
const apiRoutes = require('./controller/api.controller');

/** for parsing application/json **/
app.use(express.json());

/** for parsing application/x-www-form-urlencoded **/
app.use(express.urlencoded({extended: true}));

/** use all routes /api **/
app.use('/api', apiRoutes);

/** server listens to requests **/
const server = app.listen(config.development.port, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});