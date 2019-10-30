const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
        productid: String,
        description: String,
        producttype: String,
        expiredays: Number
    },
    {
        timestamps: true,

    });

const ProductModel = mongoose.model('products',productSchema);

module.exports = ProductModel;