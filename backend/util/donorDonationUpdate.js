const Donor = require('../models/donor.model');


//@esc finds a specific donor based on the golden demographics
const findDonorQuery = (lastName,  dob, ssn) => {
    let query = Donor.findOne({lastName: lastName, ssn: ssn, dob: {$eq:dob}});
    return query;
}

//@desc returns elegible donors in a promise so the async nature of the call is handled correctly.
const donorDonationUpdate =  function(donationSummary) {
    let {lastName, dob, ssn, din, donationDate, location} = {...donationSummary};
    let query =  findDonorQuery( lastName, dob, ssn );
    return new Promise(function(resolve, reject) {
        query.exec(async function (err, donor) {
            if (err) {
                reject(err);
            } else {
                let d = {donationDate: donationDate, din: din, location: location};
                donor.donations.unshift(d);
                donor.lastdonation = donationDate;
                try {
                    await donor.save();
                    resolve(donor);
                } catch(e) {
                    reject(e);
                }
            }
        })
    })
};

module.exports = donorDonationUpdate;