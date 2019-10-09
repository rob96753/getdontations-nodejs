const router = require('express').Router();
let Donation = require('../models/donation.model');

router.route('/').get((req, res) => {
    Donation.find()
        .then(donations=> res.json(donations))
        .catch(err=> res.status(400).json('Error' + err));
});

router.route('/add').post((req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const middlename = req.body.middlename;
    const ssn = req.body.ssn;
    const dodid = req.body.dodid;
    const bloodtype = req.body.bloodtype;
    const race = reg.body.race;
    const dob = req.body.dob;
    const service = req.body.service;
    const rank = req.body.rank;
    const paygrade = req.body.paygrade;
    const din = req.body.din;
    const products = req.body.products;

    const newDonor = new Donor({firstname,
        lastname,
        middlename,
        ssn,
        dodid,
        bloodtype,
        race,
        dob,
        service,
        rank,
        paygrade,
        din,
        products
    });

    newDonor.save()
        .then(() => res.json('Donor Added!'))
        .catch(err=> res.status(400).json('Error: ' + err));
});


module.exports = router;