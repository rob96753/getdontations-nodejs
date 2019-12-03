const config = require('config');
const DateFormatting = require('./dateformatting');
const fs = require('fs');
const donationAdd = require('./donationAdd');
const Donation = require('../models/donation.model');
const Product = require('../models/donationproduct.schema');
const donorDonationUpdate = require('../util/donorDonationUpdate');

//@desc
const generateProducts = (uic, location, donors) => {
    return new Promise((resolve, reject) => {
            try {
                const productsPath = config.get('productsPath');
                // using a synchronous read here because this data is required for processing and should occur quickly.
                const products = JSON.parse(fs.readFileSync(productsPath));
                const productGroups = products.groups;
                const productGroupsKeys = Object.keys(productGroups);
                const productGroupsCount = productGroupsKeys.length;
                const numberDontations = donors.length;
                const donations = [];
                const prefix = config.get('dinPrefix');
                const df = new DateFormatting();

                let dateInfo = new DateFormatting();
                const dinInfix = dateInfo.getYYYYMMDDMISS();
                const dinIndex = 0;
                donors.map((donor, dinIndex) => {
                    let currentDin = `${prefix}${dinInfix}${dinIndex.toString().padStart(2, '0')}`;
                    let productGroupIndex = Math.floor((Math.random() * productGroupsCount));
                    let productItems = productGroups[productGroupsKeys[productGroupIndex]];
                    if (!productItems) {
                        console.log(`product items empty ${productGroupIndex}`);
                    }
                    let donationProducts = [];

                    donor = donor._doc;
                    let newDonation = new Donation({
                        firstname: donor.firstname,
                        lastname: donor.lastname,
                        ssn: donor.ssn.replace(/-/g, ''),
                        dob:  donor.dob,
                        gender: donor.gender,
                        bloodtype: donor.bloodtype,
                        din: currentDin,
                        donationdate: Date.now(),
                        donationsite: location,
                        race: donor.race,
                        service: donor.service,
                        rank: donor.rank,
                        paygrade: donor.paygrade,
                        donationuic: uic
                    });

                    for (let i = 0; i < productItems.length; i++) {
                        let productDesc = products.products[productItems[i]].desc;
                        let expireIn = products.products[productItems[i]].expire;
                        newDonation.products.push({
                            product: productItems[i],
                            productname: productDesc,
                            expiredate: dateInfo.computeExpireDate(Date.now(), expireIn)
                        })
                    }

                    // add the donation to the donations list
                    donationAdd(newDonation)
                        .then( (donationSummary) => {
                                donorDonationUpdate(donationSummary);
                                /*
                                    .then(donor => console.log(donor))
                                    .catch(
                                        err=> console.log(err))

                                 */
                            })
                        .catch(err=>console.log(`Error Donor Update ${err}`))
                    .catch( err =>
                        console.log(`Error${err}`)
                    );

                donations.push(newDonation);
            })
                resolve(donations);

            } catch (e) {
                reject(`Exception occurred in generateProducts ${e}`);
            }
        })

}

module.exports = generateProducts;