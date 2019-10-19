const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const productSchema = new Schema({
    product: String, productname: String, expiredate: {type: Date}
});


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
    donationsite: String,
    race: String,
    service: String,
    rank: String,
    paygrade: String,
    donationuic: String,
    products: [productSchema],
    child: productSchema
    },
    {
        timestamps: true,

    });

const DonationModel = mongoose.model('donations',donationSchema);

module.exports = DonationModel;