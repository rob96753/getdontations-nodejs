


const donationAdd = (newDonation) => {
    return new Promise(function(resolve, reject) {
        newDonation.save()
            .then((newDonation) => {
                const donationSummary = {lastname: newDonation.lastname, ssn: newDonation.ssn, dob: newDonation.dob, din: newDonation.din, donationdate: newDonation.donationdate, donationuic: newDonation.donationuic, location:newDonation.donationsite};
                resolve(donationSummary);
            })
            .catch(err=>reject(err));
    })

}

module.exports = donationAdd;
