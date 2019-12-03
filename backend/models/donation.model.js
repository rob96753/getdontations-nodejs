const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = require('./donationproduct.schema');

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
    donationdate: Date,
    donationsite: String,
    race: String,
    service: String,
    rank: String,
    paygrade: String,
    donationuic: String,
    products: [ProductSchema],
    child: ProductSchema
    },
    {
        timestamps: true,

    });

const Donation = mongoose.model('Donation',donationSchema);

module.exports = Donation;


