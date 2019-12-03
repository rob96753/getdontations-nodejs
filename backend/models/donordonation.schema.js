const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DonorDonationSchema = new Schema ({donationdate:{type: Date}, din: String, location: String})

//const DonorDonationModel = mongoose.model('donorDonation',donorDonationSchema);

module.exports = DonorDonationSchema;