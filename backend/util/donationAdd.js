let Donation = require('../models/donation.model');

const donationAdd = (newDonation) => {
    return new Promise(function(resolve, reject) {
        newDonation.save()
            .then((newDonation) => {
                donationSummary = {lastname: newDonation.lastname, ssn: newDonation.ssn, dob: newDonation.dob, din: newDonation.din};
                resolve(donationSummary);
            })
            .catch(err=>reject(err));
    })

}



module.exports = donationAdd;
