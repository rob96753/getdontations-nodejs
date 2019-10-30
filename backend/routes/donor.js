const router = require('express').Router();
let Donor = require('../models/donor.model');
const authorize = require('../../middleware/auth');


require('dotenv').config();
const DAYS_BETWEEN_DONATIONS = process.env.DAYS_BETWEEN_DONATIONS;

router.route('/').get((req, res) => {
    Donor.find()
        .then(donors=> res.json(donors))
        .catch(err=> res.status(400).json('Error' + err));
});




// @route POST /donors/add
// @desc Adds a donor to the database
// @access Private
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
    const lastdonation = Date.parse(req.body.lastdonation);
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
        lastdonation,
        donations
    });

    console.log(newDonor)

    newDonor.save()
        .then(() => res.json('Donor Added!'))
        .catch(err=> res.status(400).json('Error: ' + err));
});

/**
 * Updates a donor record by adding a new donation reference and setting the last donation date
 * @param req {donorlastname, donorssn, donordob {donation}}
 *
 */
router.put('/donation',authorize,(req, res) =>{

    }
)

/**
 * Find a donor using the donors internal database _id
 *
 */
router.get('/:id',authorize,(req, res)=>{
    Donor.findById(req.params.id)
        .then(donor=> res.json(donor))
        .catch(err=> res.status(400).json('Error: ' + err));
});


router.get('/eligible/:donors_count',authorize,(req, res)=>{
    var lastEligibleDonation = Date.now() - (DAYS_BETWEEN_DONATIONS * (1000 * 3600 * 24))

    Donor.find({lastdonation: {$gt: lastEligibleDonation}})
        .then(donors=> res.json(donors))
        .catch(err=> res.status(400).json('Error' + err));
});


/**
 * Find a donor using the golden demographics for the donor
 * @param req {donor.lastname, donor.ssn, donor.dob}
 *
 * http://localhost:5000/donor/find/LAWSON/966-21-1789/1988-04-15
 */
router.get('/find/:lastname/:ssn/:dob',authorize,(req, res) => {
    Donor.findOne({lastname: req.params.lastname, ssn: req.params.ssn, dob: new Date(req.params.dob)}, function(err, adventure) {})
        .then( (donor=>res.json(donor)))
            .catch(err=>res.status(400).json('Find Error' + err));

});


// @route POST /donors/update
// @desc Updates donor information with last donation date and adds donation to list of donations
// @access Private
router.put('/update',authorize,(req, res) => {
    const lastname = req.body.lastname;
    const ssn = req.body.ssn;
    const dob = new Date(req.body.dob);
    const donation = req.body.donation;
    let result = '';
    console.log(donation);
    Donor.findOne({lastname: lastname, ssn: ssn, dob: new Date(dob)}, function(err, result) {
        const _id = result._id;
        const lastdonation = new Date(result.lastdonation).setHours(0,0,0,0);
        const currentdate = new Date();
        var difference_in_time = (currentdate - lastdonation)/ (1000 * 3600 * 24);

        console.log(`Result: ${difference_in_time} ${_id} ${daysbetweendonation}`);

    })
        .then( (donor=>res.json(donor)))
        .catch(err=>res.status(400).json('Find Error' + err));



});

router.delete('/:id',authorize,(req, res)=>{
    Donor.findByIdAndDelete(req.params.id)
        .then(()=> res.json('Donor deleted!'))
        .catch(err=> res.status(400).json('Error: ' + err));
    }
);

router.delete('/eligible/:days',authorize,(req, res)=>{
        Donor.findBy(req.params.days)
            .then(()=> res.json('Donor deleted!'))
            .catch(err=> res.status(400).json('Error: ' + err));
    }
);



module.exports = router;