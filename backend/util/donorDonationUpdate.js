
const Donor =  require('../models/donor.model');


//@esc finds a specific donor based on the golden demographics
const findDonorQuery = (lastname,  dob, ssn) => {
    let query = Donor.findOne({lastname: lastname, ssn: ssn, dob: {$eq:dob}});
    return query;
}

//@desc returns elegible donors in a promise so the async nature of the call is handled correctly.
const donorDonationUpdate =  function(donationSummary) {
    return new Promise(async function(resolve, reject) {
        let {lastname, dob, ssn, din, donationdate, location} = {...donationSummary};
        ssn = ssn.slice(0, 3) + '-' + ssn.slice(3, 5) + '-' + ssn.slice(-4);
        try {
            Donor.findOne({lastname: lastname, ssn: ssn})
                .then(async (donor) => {
                    console.log(donor);
                    donor.donations.unshift({donationdate: donationdate, din: din, location: location});
                    donor.lastdonation = donationdate;
                    await donor.save();
                    resolve(donor);
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (err) {
            throw err;
        }
    })

};



module.exports = donorDonationUpdate;