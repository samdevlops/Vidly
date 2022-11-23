const express = require('express');
const router = express.Router();
const { Rentals, validateRental } = require('../models/rental');
const { Movies } = require('../models/movie');
const { Customer } = require('../models/customer');

router.get('/', async (req, res) => {
    const rentals = await Rentals.find();

    res.send(rentals);
});

router.get('/:id', async (req, res) => {
    const rental = await Rentals.findById(req.params.id);

    if(!rental) return res.status(404).send('Rental with given ID does not exist...');

    res.send(rental);
});

router.post('/', async (req, res) => {
    const {error} = validateRental(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const movie = Movies.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Movie with given ID does not exist...');

    const customer = Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Customer with given ID does not exist...');

    const rental = new Rentals({
        customer :customer, 
        movie : movie,
        dateOut :req.body.dateOut,
        dateReturned :req.body.dateReturned,
        rentalFee : req.body.rentalFee
    });

    const result = await rental.save(rental);

    res.send(result);
});

router.delete('/:id', async (req, res) => {
    const rental = await Rentals.findByIdAndDelete(req.params.id);

    if(!rental) return res.status(404).send("Rental with given ID does not exist...");

    res.send(rental);
});

module.exports = router;