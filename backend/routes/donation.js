const router = require('express').Router();
let Donation = require('../models/donation.model');


//@route Get /donation/
//@desc Get All Donations
//@access Public
router.route('/').get((req, res) => {
    Donation.find()
        .then(donations=> res.json(donations))
        .catch(err=> res.status(400).json('Error' + err));
});



//@route Post /donation/add
//@desc Add a Donation to the database
//@access Public
router.route('/add').post((req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const ssn = req.body.ssn;
    const dodid = req.body.dodid;
    const bloodtype = req.body.bloodtype;
    const race = req.body.race;
    const dob = req.body.dob;
    const service = req.body.service;
    const rank = req.body.rank;
    const paygrade = req.body.paygrade;
    const din = req.body.din;
    const donationsite = req.body.donationsite;
    const donationdate = req.body.donationdate;
    const products = req.body.products;
    const donationuic = req.body.donationuic;

    const newDonation = new Donation({firstname,
        lastname,
        ssn,
        dodid,
        bloodtype,
        dob,
        din,
        donationdate,
        donationsite,
        donationuic,
        race,
        service,
        paygrade,
        rank,
        products
    });

    newDonation.save()
        .then(() => res.json(donation=> res.json(donation)))
        .catch(err=> res.status(400).json('Error: ' + err));
});


module.exports = router;