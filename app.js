/** initialize express **/
const express = require('express');
const app = express();

/** cors **/
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

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
const server = app.listen(config.port, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log("app listening at http://%s:%s", host, port);
});