const router = require('express').Router();
let User = require('../../models/user.model');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var HttpStatus = require('http-status-codes');

//@route GET api/login/authenticate
//@param emailaddress: String
//       password: String -- the password hash
//@desc Authenticate the user
//@access Public
router.post('/authenticate', (req, res) => {
    const email_address = req.body.emailaddress;
    const password =  decodeURI(req.body.password);

    if (!email_address || !password) {
        return res.status(HttpStatus.BAD_REQUEST).json({msg: 'Please provide an email address and a password.'});
    }

    User.findOne({emailaddress: email_address}, function (err, user) {
        if (!user) return res.status(HttpStatus.BAD_REQUEST).json({msg: 'User Doesn\'t Exist'});

        // validate password
        bcrypt.compare(password, user.passwordhash)
            .then((isMatch) => {
                if (!isMatch) return res.status(HttpStatus.UNAUTHORIZED ).json({msg: 'Invalid User Login!'});
                jwt.sign(
                    {id: user._id},
                    config.get('jwtSecret'),
                    {expiresIn: config.get('tokenExpiresIn')},
                    (err, token) => {
                        if (err) throw err;
                        res.json({
                            status: HttpStatus.OK,
                            token,
                            user: {
                                id: user._id,
                                emailaddress: user.emailaddress,
                                name: `${user.firstname} ${user.lastname}`
                            }

                        });
                    });
            });
    });
});


module.exports = router;