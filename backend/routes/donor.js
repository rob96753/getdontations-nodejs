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

    newDonor.save()
        .then(() => res.json('Donor Added!'))
        .catch(err=> res.status(400).json('Error: ' + err));
});

/**
 * Updates a donor record by adding a new donation reference and setting the last donation date
 * @param req {donorlastname, donorssn, donordob {donation}}
 *
 */
router.route('/donation').put((req, res) =>{

    }
)

/**
 * Find a donor using the donors internal database _id
 *
 */
router.route('/:id').get((req, res)=>{
    Donor.findById(req.params.id)
        .then(donor=> res.json(donor))
        .catch(err=> res.status(400).json('Error: ' + err));
});



/**
 * Find a donor using the golden demographics for the donor
 * @param req {donor.lastname, donor.ssn, donor.dob}
 *
 * http://localhost:5000/donor/find/LAWSON/966-21-1789/1988-04-15
 */
router.route('/find/:lastname/:ssn/:dob').get((req, res) => {
    Donor.findOne({lastname: req.params.lastname, ssn: req.params.ssn, dob: new Date(req.params.dob)}, function(err, adventure) {})
        .then( (donor=>res.json(donor)))
            .catch(err=>res.status(400).json('Find Error' + err));

});

router.route('/:id').delete((req, res)=>{
    Donor.findByIdAndDelete(req.params.id)
        .then(()=> res.json('Donor deleted!'))
        .catch(err=> res.status(400).json('Error: ' + err));
    }
);

router.route('/eligible/:days').delete((req, res)=>{
        Donor.findBy(req.params.days)
            .then(()=> res.json('Donor deleted!'))
            .catch(err=> res.status(400).json('Error: ' + err));
    }
);



module.exports = router;