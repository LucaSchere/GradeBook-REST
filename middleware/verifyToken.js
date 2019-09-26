/** initialize jwt object**/
const jwt = require('jsonwebtoken');

/** initialize config **/
const config = require('../config/config');

/** middleware function to check the
 *  validity of the token **/
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

/** export module middleware verifyToken **/
module.exports = verifyToken;