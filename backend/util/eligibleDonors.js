const Donor = require('../models/donor.model');
const eligibleDate = require('./getEligibleDate');
const config = require('config');

//@applies filters to the find query in order to get a list of eligible donors.
function eligibleDonorsQuery(service) {
    let query = Donor.find({lastdonation: {$lte:eligibleDate()}, service: service});
    return query;
}



//@desc returns elegible donors in a promise so the async nature of the call is handled correctly.
function eligibleDonors(numberDonors, service){
    let query =  eligibleDonorsQuery( service );
    return new Promise(function(resolve, reject) {
        query.exec(function(err, donors) {
            if (err) {
                    reject(err);
                } else
                {
                    resolve(donors.slice(0, numberDonors));
                }
        })
    })
};



module.exports = eligibleDonors;