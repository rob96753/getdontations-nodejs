const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const donorDonationSchema = new Schema ({donationdate:{type: Date}, din: String, location: String})

const donorSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 1
    },
    middlename: String,
    lastname: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 2
    },
    ssn: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 9
    },
    dodid: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 9
    },
        gender: {
            type: String,
            required: true,
            unique: false,
            trim: true,
            minlength: 1
        },
    militaryunit: String,
    bloodtype: String,
    nationality: {
      type: String,
        trim: true,
      default: 'United States of America'
    },
    race: String,
    dob: {
        type: Date,
        default: Date("1900-01-01")
    },
    service: String,
    rank: String,
    paygrade: String,
    lastdonation: {
        type: Date,
        default: Date("1980-01-01")
    },
    donations:[donorDonationSchema],
    child: donorDonationSchema
    },
    {
        timestamps: true,
        _id: true

    });

const DonorModel = mongoose.model('donors',donorSchema);

module.exports = DonorModel;