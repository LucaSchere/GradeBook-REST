const jwt = require('jsonwebtoken');
const config = require('../config/config');

function verifyToken(req, res, next) {
    const token = req.header('jwt');
    if (!token)
        return res.status(403).send({success: false, message: 'No token provided.'});

    try {
        req.user = jwt.verify(token, config.server_secret);
        next();
    } catch (e) {
        return res.status(403).send({success: false, message: 'Invalid token.'});
    }
}

module.exports = verifyToken;