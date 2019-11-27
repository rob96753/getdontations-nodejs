const config = require('config');
const products = require(config.get('productsPath'));

//@desc
const generateProducts = () => {
    try{
        const products = config.products.products;
        const productGroups = config.products.groups;
    } catch (e) {

    }
}