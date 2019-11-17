const config = require('config');
const jwt = require('jsonwebtoken')
var HttpStatus = require('http-status-codes');

//@desc
//@error send unauthorized status (401)
function auth(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) return res.status(HttpStatus.UNAUTHORIZED).json({msg: 'No Token, authorization denied!'});

    try {
        // verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // Add user from payload
        req.user = decoded;
        next();
    } catch (e) {
        console.log('Token Exception: ' + e);
        res.status(HttpStatus.BAD_REQUEST).json({msg: `Authorization Token Isn\'t Valid, Authorization Failed! ${e}`})
    }
}

module.exports = auth;