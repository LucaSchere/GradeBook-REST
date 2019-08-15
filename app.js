const express = require('express');
const app = express();

const config = require('./config/config.json');

const apiRoutes = require('./controller/api.controller');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.use('/api', apiRoutes);
const server = app.listen(config.development.port, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});