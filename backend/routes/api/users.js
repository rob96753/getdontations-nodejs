const router = require('express').Router();
let User = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const authorize = require('../../../middleware/auth')

const BCRYPT_ROUNDS = 10;

//@route    Get api/users
//@desc     Get the list of all users
//@access   Private
router.route('/').get((req, res) => {

});

//@route    POST api/home
//@desc     Create a user in the database
//@access   Public
router.route('/register').post((req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const emailaddress = req.body.emailaddress;
    const password = req.body.password;
    const passwordhash = '';
    const registerdate = Date.now();
    console.log('Register req.body: ' + req.body);
    if (!firstname || !lastname || !emailaddress || !password || !registerdate) {
        return res.status(400).json({msg: 'please enter all fields!'})
    } else {

        // if the user exists, in the database (i.e., the email address), then an
        // exception will be thrown.
        const newUser = new User({
            firstname,
            lastname,
            emailaddress,
            passwordhash,
            registerdate
        });

        console.log('New user: ' + newUser);

        bcrypt.genSalt(BCRYPT_ROUNDS, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    res.status(400).json('Hash Error ' + err);
                }
                newUser.passwordhash = hash;
                newUser.save()
                    .then((user) => {
                            jwt.sign({
                                id: user._id,
                                name: `${user.firstname} ${user.lastname}`},
                                config.get('jwtSecret'),
                                {expiresIn: config.get('tokenExpiresIn')},
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
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
                    .catch(err=> res.status(400).json('Error: ' + err));

            });
        });
    }
});

//@route GET api/validate
//@param emailaddress: String
//       password: String -- the password hash
//@desc Authenticate the user
//@access
router.route('/authenticate').post((req, res) => {
    console.log('authenticating user!');
    const email_address = req.body.emailaddress;
    const password =  decodeURI(req.body.password);

    console.log(`email_address is ${email_address} password is ${password}`);
    User.findOne({emailaddress: email_address}, function (err, user) {
        console.log("Error:" + err + "  User :" + user);
        if (!user) return res.status(400).json({msg: 'User Doesn\'t Exist'});

        console.log('User Found');
        bcrypt.compare(password, user.passwordhash).then((isMatch) => {
            console.log('user valid: ' + isMatch);
            if (!isMatch) return res.status(400).json({msg: 'Ivalid User Login!'});
            jwt.sign(
                {id: user._id},
                config.get('jwtSecret'),
                {expiresIn: config.get('tokenExpiresIn')},
                (err, token) => {
                    if (err) throw err;
                    res.json({
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

//@desc Tests the password for strength making sure is has 8 charactes and
// contain 1 lowercase, 1 uppercase, 1 numerid and 1 special character (e.g.,$&#@!^*&)
// Strong: The password must be at least 8 charactes and contain 1 lowercase, 1 uppercase, 1 numerid and 1 special character (e.g.,$&#@!^*&)
// Medium Strength is commented out for now.
// Medium Strength: medium strength if it contains six characters or more and has at least one
// lowercase and one uppercase alphabetical character or has at least one lowercase and one
// numeric character or has at least one uppercase and one numeric character.
//
router.route('/pwdstrength/:password').get( (req, res) => {
    const password = decodeURI(req.params.password);
    let weak_password_note = 'The password must be at least 8 charactes and contain 1 lowercase, 1 uppercase, 1 numerid and 1 special character (e.g.,$&#@!^*&)';
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if (strongRegex.test(password)) {
        res.send(JSON.stringify({status: true, message: "Strong Password"}))
    } else {
        res.status(400).json({'message':`${weak_password_note}`});
        /*
        var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        if (mediumRegex.test(password)) {
            res.send(JSON.stringify({status: true, message: "Medium Password (consider strengthening)"}))
        } else {
            res.status(400).json({'message':`${weak_password_note}`});
        }

         */
    }
});

//@route GET api/email/:emailaddress
router.route('/email/:emailaddress').get((req, res)=>{
    var emailaddress = req.params.emailaddress;
    var regex = /^[a-zA-Z0-9\.\-\_\%\!\#\&\'\+\-\/\=\?\^\`\{\|\}\~\;]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
    if (regex.test(emailaddress)) {
        res.json({'status':200, 'message':'Valid Email Address!'});
    } else {
        res.status(400).json('Invalid Email Address: ' + err);
    }
});

// @route /user
// @desc
// @access Private
router.get('/user', authorize, (req, res) => {
    const userId = req.user.id;
    User.findById(userId)
        .select('-password')
        .then(user=>res.json(user));
});

module.exports = router;