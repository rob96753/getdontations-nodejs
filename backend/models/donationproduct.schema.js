const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    product: String, productname: String, expiredate: {type: Date}
});

module.export = ProductSchema;