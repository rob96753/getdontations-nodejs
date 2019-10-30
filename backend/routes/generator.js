const router = require('express').Router();
let Donation = require('../models/donation.model');
let Product = require('../models/product.model');
let Donors  = require('../models/donor.model')

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

//http://localhost:5000/generator/GetDonations/count/5/location/W1HHAA
router.route('/GetDonations/count/:count/location/:location').get((req, res) => {
    const count = req.params.count;
    const location = req.params.location;
    const someProducts = [];
    Product.find().then((products) => {
        products.forEach((product) => {
                someProducts.push(product);
            }
        )
    }).catch((error)=>{
         res.status(500).send(`Get products failed in ${error}`)
    });

    Donors.find().then((donors) => {
        donors.forEach((donor) => {
            for (let donation of donor.donations) {
                console.log(donation.donationdate);
            }
        })
    }).catch((error)=>{
        res.status(500).send(`Get donors failed in ${error}`)
    });

    console.log(someProducts);
    res.json(`Result: ${count} : ${location}`)
})

module.exports = router;

