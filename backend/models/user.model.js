const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
        lastname: {type: String,
                    required: true},
        firstname: {type: String,
                    required: true},
        emailaddress: {type: String,
            required: true,
            unique: true},
        passwordhash: {type: String,
            required: true},
        registerdate: {type: Date,
                        default: Date.now},
        isactive: {type:Boolean,
                    default: true}
    },
    {
        timestamps: true,
    });


//@desc create a password hash (This needs to be fixed and made functional)
userSchema.methods.hashpassword = function hashpassword(params, callback) {
    const {rounds, password} = params;
    bcypt.genSalt(rounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                res.status(400).json('Error: ' + err);
            }

            newUser.save()
                .then(() => res.json('Registered User!'))
                .catch(err=> res.status(400).json('Error: ' + err));
        });
    });
}

const UserModel = mongoose.model('User',userSchema);



module.exports = UserModel;