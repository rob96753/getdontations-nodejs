const router = require('express').Router();
const Product = require('../models/product.model');
const generateProducts = require('../util/donationGenerator');
const eligibleDonors = require('../util/eligibleDonors');

function days_since_last_donation(donations_list) {

}

router.route('/:location').get((req, res) => {
    var random = Math.random()
    var location = req.params.location

    console.log(location);
    res.json(location)
});

router.route('/').get((req, res) => {
    Product.find()
        .then(products=> res.json(products))
        .catch(err=> res.status(400).json('Error' + err));
});

router.route('/addProduct').post((req, res) => {
    const productid = req.body.productid;
    const description = req.body.description;
    const producttype = req.body.producttype;
    const expiredays = req.body.expiredays;

    const newProduct = new Product({
        productid,
        description,
        producttype,
        expiredays
    });

    newProduct.save()
        .then(()=>res.json('Product Added'))
        .catch(err=>res.status(400).json(`Error ${err}`));

});

router.route('/deleteProduct/:id').delete((req, res)=>{
        Product.findByIdAndDelete(req.params.id)
            .then(()=> res.json('Product deleted!'))
            .catch(err=> res.status(400).json('Error: ' + err));
    }
);

//http://localhost:5000/generator/GetDonations
router.route('/GetDonations').post((req, res) => {
    const count = req.body.count;
    const uic = req.body.uic;
    const location = req.body.location;
    const service = req.body.service.toUpperCase();
    let donations = [];
    eligibleDonors(count, service)
        .then(donors=> generateProducts(uic, location, donors)
        )
        .then( () => res.json(donations)
        )
        .catch(err=>res.status(400).json('Find Error' + err));
});



module.exports = router;

