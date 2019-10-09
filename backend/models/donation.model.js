const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const donationSchema = new Schema({
    firstname: String,
    lastname: String,
    ssn: String,
    dob: Date,
    gender: String,
    bloodtype: String,
    din: {
        type:String,
        required: true,
        unique: true,
        trim: true,
        minlength: 10
    },
    products: [{product: String, productname: String, expiredate: Date}]

    },
    {
        timestamps: true,

    });

const DonationModel = mongoose.model('donations',donationSchema);

module.exports = DonationModel;