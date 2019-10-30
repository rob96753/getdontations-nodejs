const router = require('express').Router();
let User = require('../../models/user.model');

router.route('/login').post((req, res) => {
    const emailaddress = req.body.emailaddress;
    const passwordhash = req.body.passwordhash;
});


module.exports = router;