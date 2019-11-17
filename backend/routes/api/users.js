const router = require('express').Router();
let User = require('../../models/user.model');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authorize = require('../../../middleware/auth');
var HttpStatus = require('http-status-codes');

const BCRYPT_ROUNDS = 10;

//@route    Get api/users
//@desc     Get the list of all users
//@access   Private
router.route('/').get((req, res) => {

});

//@route    POST api/users/register
//@desc     Create a user in the database
//@access   Public
router.post('/register',(req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const emailaddress = req.body.emailaddress;
    const password = req.body.password;
    const passwordhash = '';
    const registerdate = Date.now();

    if (!firstname || !lastname || !emailaddress || !password || !registerdate) {
        return res.status(HttpStatus.BAD_REQUEST).json({msg: 'please enter all fields!'})
    }

    // if the user exists, in the database (i.e., the email address), then an
    // exception will be thrown.


    User.findOne({emailaddress})
        .then(user=> {
            if (user) return res.status(HttpStatus.BAD_REQUEST).json({msg: 'User Already Exists'});

            const newUser = new User({
                firstname,
                lastname,
                emailaddress,
                passwordhash,
                registerdate
            });

            console.log(config.get('tokenExpiresIn'));
            bcrypt.genSalt(BCRYPT_ROUNDS, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        res.status(HttpStatus.BAD_REQUEST).json('Hash Error ' + err);
                    }
                    newUser.passwordhash = hash;
                    newUser.save()
                        .then((user) => {
                            jwt.sign({
                                    id: user._id,
                                    name: `${user.firstname} ${user.lastname}`
                                },
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
                                        }
                                    );

                                })
                        })
                        .catch(err => res.status(HttpStatus.BAD_REQUEST).json('Error: ' + err));
                });
            });
        });




});


//@desc Tests the password for strength making sure is has 8 charactes and
// contain 1 lowercase, 1 uppercase, 1 numerid and 1 special character (e.g.,$&#@!^*&)
// Strong: The password must be at least 8 charactes and contain 1 lowercase, 1 uppercase, 1 numerid and 1 special character (e.g.,$&#@!^*&)
// Medium Strength is commented out for now.
// Medium Strength: medium strength if it contains six characters or more and has at least one
// lowercase and one uppercase alphabetical character or has at least one lowercase and one
// numeric character or has at least one uppercase and one numeric character.
//
router.get('/pwdstrength/:password',(req, res) => {
    const password = decodeURI(req.params.password);
    let weak_password_note = 'The password must be at least 8 charactes and contain 1 lowercase, 1 uppercase, 1 numerid and 1 special character (e.g.,$&#@!^*&)';
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if (strongRegex.test(password)) {
        res.send(JSON.stringify({status: HttpStatus.OK, message: "Strong Password"}))
    } else {
        res.status(HttpStatus.BAD_REQUEST).json({'message':`${weak_password_note}`});
        /*
        var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        if (mediumRegex.test(password)) {
            res.send(JSON.stringify({status: true, message: "Medium Password (consider strengthening)"}))
        } else {
            res.status(HttpStatus.BAD_REQUEST).json({'message':`${weak_password_note}`});
        }

         */
    }
});

//@route GET api/users/email/:emailaddress
//@desc Validates the email address
router.get('/email/:emailaddress',(req, res)=>{
    var emailaddress = req.params.emailaddress;
    var regex = /^[a-zA-Z0-9\.\-\_\%\!\#\&\'\+\-\/\=\?\^\`\{\|\}\~\;]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
    if (regex.test(emailaddress)) {
        res.json({'status':HttpStatus.OK, 'message':'Valid Email Address!'});
    } else {
        res.status(HttpStatus.BAD_REQUEST).json('Invalid Email Address: ' + err);
    }
});


// @route api/users/user
// @desc Get user data based on the id contained in the payload of the token.
// @access Private
router.get('/user', authorize, (req, res) => {
    const userId = req.user.id;
    User.findById(userId)
        .select('-passwordhash')
        .then(user=>res.json(user));
});

module.exports = router;