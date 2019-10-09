const router = require('express').Router();
let Donor = require('../models/donor.model');

router.route('/').get((req, res) => {
    Donor.find()
        .then(donors=> res.json(donors))
        .catch(err=> res.status(400).json('Error' + err));
});

router.route('/add').post((req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const middlename = req.body.middlename;
    const ssn = req.body.ssn;
    const dodid = req.body.dodid;
    const bloodtype = req.body.bloodtype;
    const race = req.body.race;
    const dob = Date.parse(req.body.dob);
    const service = req.body.service;
    const gender = req.body.gender;
    const militaryunit = req.body.militaryunit;
    const rank = req.body.rank;
    const paygrade = req.body.paygrade;
    const donations = req.body.donations;

    const newDonor = new Donor({firstname,
        lastname,
        middlename,
        ssn,
        dodid,
        bloodtype,
        race,
        dob,
        gender,
        militaryunit,
        service,
        rank,
        paygrade,
        donations
    });

    newDonor.save()
        .then(() => res.json('Donor Added!'))
        .catch(err=> res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res)=>{
    Donor.findByIdAndDelete(req.params.id)
        .then(donor=> res.json(donor))
        .catch(err=> res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res)=>{
    Donor.findByIdAndDelete(req.params.id)
        .then(()=> res.json('Donor deleted!'))
        .catch(err=> res.status(400).json('Error: ' + err));
    }
);

router.route('/eligible/:days').delete((req, res)=>{
        Donor.findByIdAndDelete(req.params.days)
            .then(()=> res.json('Donor deleted!'))
            .catch(err=> res.status(400).json('Error: ' + err));
    }
);



module.exports = router;