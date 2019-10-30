const config = require('config');
const jwt = require('jsonwebtoken')

//@desc
// send unauthorized status (401)
function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({msg: 'No Token, authorization denied!'})

    try {
    // verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Add user from payload
    req.user = decoded;
    next();
    } catch (e) {
        res.status(400).json({msg: 'Token Isn\'t Valid!'})

    }
}

module.exports = auth;