require('dotenv').config();

const products = require(process.env.PRODUCTS)
console.log(products.products)
