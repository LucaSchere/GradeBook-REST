const app = require('express').Router();
const authRoutes = require('./authentication.controller');

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Connected!'
    });
});

app.use('/auth', authRoutes);

module.exports = app;