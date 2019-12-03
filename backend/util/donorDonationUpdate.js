
const Donor =  require('../models/donor.model');


//@esc finds a specific donor based on the golden demographics
const findDonorQuery = (lastname,  dob, ssn) => {
    let query = Donor.findOne({lastname: lastname, ssn: ssn, dob: {$eq:dob}});
    return query;
}

//@desc returns elegible donors in a promise so the async nature of the call is handled correctly.
const donorDonationUpdate =  function(donationSummary) {
    let {lastname, dob, ssn, din, donationdate, location} = {...donationSummary};
    let query =  findDonorQuery( lastname, dob, ssn );
    return new Promise(async function(resolve, reject) {
        await query.exec(async function (err, donor) {
            if (err) {
                reject(err);
            } else {
                try {
                    donor.donations.unshift({donationdate: donationdate, din: din, location: location});
                    donor.lastdonation = donationdate;
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